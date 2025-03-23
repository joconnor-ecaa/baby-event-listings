import cv2
import numpy as np
import pandas as pd
import pytesseract
import typer
from scipy import stats
from sklearn.cluster import AgglomerativeClustering
from tqdm import tqdm


def parse_timetable_image(image_path):
    # Load the image
    image = cv2.imread(image_path)

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    is_foreground = (gray < 250).astype(np.uint8)

    # binary opening to enhance the cell boundaries
    is_foreground = cv2.morphologyEx(is_foreground, cv2.MORPH_OPEN, np.ones((3, 3)))

    # Find connected components in the foreground mask
    num_labels, label_array = cv2.connectedComponents(is_foreground.astype(np.uint8))

    # drop any segments that are too small
    big_segments = pd.Series(label_array.flatten()).value_counts() > 1000
    big_segments_labels = big_segments[big_segments].index.values

    outputs = []
    # For each label in big segments
    for label in tqdm(big_segments_labels):
        # Get coordinates of pixels with current label
        y_coords, x_coords = np.where(label_array == label)

        center_y = int(np.nanmean(y_coords))
        center_x = int(np.nanmean(x_coords))

        # Find bounding box
        min_y, max_y = np.min(y_coords), np.max(y_coords)
        min_x, max_x = np.min(x_coords), np.max(x_coords)

        # Crop original image to bounding box
        segment = image[min_y : max_y + 1, min_x : max_x + 1].copy()

        majority_color = stats.mode(segment, axis=(0, 1)).mode

        # Convert RGB to hex
        hex_color = (
            f"#{majority_color[0]:02x}{majority_color[1]:02x}{majority_color[2]:02x}"
        )

        text = pytesseract.image_to_string(segment)

        outputs.append({"text": text, "color": hex_color, "x": center_x, "y": center_y})

    return pd.DataFrame(outputs)


def main(image_path: str, output_path: str):
    df = parse_timetable_image(image_path)
    df = df[df["text"].str.strip().str.len() > 0]

    # Prepare data for clustering
    X = df.x.values.reshape(-1, 1)

    # Create clustering model with distance threshold
    clustering = AgglomerativeClustering(
        n_clusters=None, distance_threshold=20, linkage="single"
    )

    # Fit the model
    df["cluster"] = clustering.fit_predict(X)
    cluster_position = df.groupby("cluster").x.mean()
    df["cluster_position"] = df.cluster.map(cluster_position)

    df = df[df["text"].str.len() < 1000]
    df = df.sort_values(by=["cluster_position", "y"])

    # save to csv
    df.to_csv(output_path, index=False)
