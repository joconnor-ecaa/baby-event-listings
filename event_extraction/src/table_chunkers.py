class TableChunker:
    def __init__(self, table_description):
        self.table_description = table_description

    def get_chunks(self, df):
        raise NotImplementedError("Subclasses must implement this method")


def table_to_text(chunk, table_description):
    row_text = f"Table description:\n\n{table_description}\n\nRow data:\n\n"
    for i, row in chunk.iterrows():
        for k, v in row.items():
            row_text += f"{k}: {v}\n"
    return row_text


class RowChunker(TableChunker):
    def get_chunks(self, df):
        chunks = []
        for i in df.index:
            chunks.append(table_to_text(df.loc[[i]], self.table_description))
        return chunks


class MultiRowChunker(TableChunker):
    def __init__(self, table_description, num_rows=5):
        super().__init__(table_description)
        self.num_rows = num_rows

    def get_chunks(self, df):
        chunks = []
        for i in range(0, len(df), self.num_rows):
            chunk = df.iloc[i : i + self.num_rows]
            chunks.append(table_to_text(chunk, self.table_description))
        return chunks


class GroupedMultiRowChunker(TableChunker):
    def __init__(self, table_description, group_columns):
        super().__init__(table_description)
        self.group_columns = group_columns

    def get_chunks(self, df):
        chunks = []
        for _, grp in df.groupby(self.group_columns):
            chunks.append(table_to_text(grp, self.table_description))
        return chunks


class ChunkedMarkdownChunker(TableChunker):
    def __init__(self, table_description, num_rows=5):
        super().__init__(table_description)
        self.num_rows = num_rows

    def get_chunks(self, df):
        chunks = []
        for i in range(0, len(df), self.num_rows):
            chunk = df.iloc[i : i + self.num_rows]
            chunks.append(chunk.to_markdown())
        return chunks
