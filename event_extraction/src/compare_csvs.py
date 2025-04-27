from difflib import SequenceMatcher
from pathlib import Path
from typing import Optional

import numpy as np
import pandas as pd
import typer


def string_similarity(a: str, b: str) -> float:
    """Calculate string similarity using SequenceMatcher."""
    return SequenceMatcher(None, str(a).lower(), str(b).lower()).ratio()

def compare_dataframes(df1: pd.DataFrame, df2: pd.DataFrame) -> dict:
    """Compare two dataframes and return similarity metrics."""
    metrics = {}
    
    # Basic metrics
    metrics['row_count_match'] = len(df1) == len(df2)
    metrics['row_count_diff'] = abs(len(df1) - len(df2))
    metrics['column_match'] = set(df1.columns) == set(df2.columns)
    
    # Column-wise similarity for common columns
    common_columns = set(df1.columns) & set(df2.columns)
    column_similarities = {}
    
    for col in common_columns:
        if len(df1) == 0 or len(df2) == 0:
            column_similarities[col] = 0
            continue
            
        # For each column, calculate average string similarity
        similarities = []
        for i in range(min(len(df1), len(df2))):
            val1 = str(df1[col].iloc[i])
            val2 = str(df2[col].iloc[i])
            similarities.append(string_similarity(val1, val2))
        
        column_similarities[col] = np.mean(similarities)
    
    metrics['column_similarities'] = column_similarities
    metrics['average_similarity'] = np.mean(list(column_similarities.values()))
    
    return metrics

def find_different_rows(df1: pd.DataFrame, df2: pd.DataFrame, threshold: float = 0.8) -> list:
    """Find rows that differ significantly between dataframes."""
    different_rows = []
    min_len = min(len(df1), len(df2))
    
    common_columns = set(df1.columns) & set(df2.columns)
    
    for i in range(min_len):
        row_similarities = []
        for col in common_columns:
            val1 = str(df1[col].iloc[i])
            val2 = str(df2[col].iloc[i])
            similarity = string_similarity(val1, val2)
            row_similarities.append(similarity)
        
        avg_similarity = np.mean(row_similarities)
        if avg_similarity < threshold:
            different_rows.append({
                'index': i,
                'similarity': avg_similarity,
                'row1': df1.iloc[i],
                'row2': df2.iloc[i]
            })
    
    return different_rows

def main(
    file1: Path = typer.Argument(..., help="Path to the first CSV file"),
    file2: Path = typer.Argument(..., help="Path to the second CSV file"),
    verbose: bool = typer.Option(False, "--verbose", "-v", help="Show detailed metrics"),
    threshold: float = typer.Option(0.8, "--threshold", "-t", 
                                  help="Similarity threshold for identifying different rows")
) -> None:
    """
    Compare two CSV files and calculate similarity metrics.
    """
    if not file1.exists():
        typer.echo(f"Error: File {file1} does not exist")
        raise typer.Exit(1)
    if not file2.exists():
        typer.echo(f"Error: File {file2} does not exist")
        raise typer.Exit(1)
    
    try:
        df1 = pd.read_csv(file1)
        df2 = pd.read_csv(file2)
    except Exception as e:
        typer.echo(f"Error reading CSV files: {str(e)}")
        raise typer.Exit(1)
    
    metrics = compare_dataframes(df1, df2)
    
    # Print results
    typer.echo("\nComparison Results:")
    typer.echo("-" * 50)
    typer.echo(f"Row count match: {metrics['row_count_match']}")
    typer.echo(f"Row count difference: {metrics['row_count_diff']}")
    typer.echo(f"Columns match: {metrics['column_match']}")
    typer.echo(f"Overall similarity: {metrics['average_similarity']:.2%}")
    
    if verbose:
        typer.echo("\nColumn-wise similarities:")
        for col, similarity in metrics['column_similarities'].items():
            typer.echo(f"{col}: {similarity:.2%}")
    
    # Find and print different rows
    different_rows = find_different_rows(df1, df2, threshold)
    if different_rows:
        typer.echo(f"\nFound {len(different_rows)} rows with significant differences (similarity < {threshold:.0%}):")
        typer.echo("-" * 50)
        for diff in different_rows:
            typer.echo(f"\nRow {diff['index']} (similarity: {diff['similarity']:.2%}):")
            typer.echo("File 1:")
            for col in df1.columns:
                typer.echo(f"  {col}: {diff['row1'][col]}")
            typer.echo("File 2:")
            for col in df2.columns:
                typer.echo(f"  {col}: {diff['row2'][col]}")
            typer.echo("-" * 50)
    else:
        typer.echo("No different rows found")

if __name__ == "__main__":
    typer.run(main)
