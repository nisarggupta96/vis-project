from flask import Flask, request
import pandas as pd

df = pd.read_csv("cars_modified.csv", engine="pyarrow")

app = Flask(__name__)


@app.post('/get_data')
def get_data():
    args = None
    df_filtered = df.copy()
    if request.data:
        args = request.get_json(force=True)

        year_start, year_end = 2000, 2020
        if "year_start" in args:
            year_start = int(args["year_start"])
        if "year_end" in args:
            year_end = int(args["year_end"])
        df_time_filtered = df_filtered.loc[
            (df_filtered["year"] >= year_start) & (df_filtered["year"] <= year_end)]

        df_filtered = df_time_filtered.copy()
        if "manufacturer" in args and args["manufacturer"] != "all":
            df_filtered = df_time_filtered.loc[
                df_time_filtered["manufacturer"] == args["manufacturer"]]
        if "state" in args and args["state"] != "all":
            df_filtered = df_filtered.loc[
                df_filtered["state"] == args["state"]]
            df_time_filtered = df_time_filtered.loc[
                df_time_filtered["state"] == args["state"]]

    state_counts = df_filtered["state"].value_counts().to_dict()
    condition_counts = [
        [k, v] for k, v in df_filtered["condition"].value_counts().to_dict().items()
    ]

    grouped_color_cylinder = df_filtered.groupby(
        ['cylinders', 'paint_color']).size().reset_index(name='count')
    colors = grouped_color_cylinder["paint_color"].unique()
    cyls = grouped_color_cylinder["cylinders"].unique()

    color_cyl_counts = []
    for color in colors:
        this_color = [color]
        for cyl in cyls:
            colorDF = grouped_color_cylinder.loc[(grouped_color_cylinder['paint_color'] == color) & (
                grouped_color_cylinder['cylinders'] == cyl)]['count']
            if len(colorDF) > 0:
                this_color.append(int(colorDF.values[0]))
            else:
                this_color.append(0)

        color_cyl_counts.append(this_color.copy())

    color_cyl_data = {
        "color_cyl_counts": color_cyl_counts,
        "colors": list(colors),
        "cylinders": list(cyls)
    }

    if "manufacturer" in args and args["manufacturer"] != "all":
        man_vs_price = df_filtered.groupby('model').agg(price=('price', 'mean'), odometer=(
            'odometer', 'mean'), count=('price', 'count')).sort_values(['count'], ascending=False).head(15)

    else:
        man_vs_price = df_time_filtered.groupby('manufacturer').agg(price=('price', 'mean'), odometer=(
            'odometer', 'mean'), count=('price', 'count')).sort_values(['count'], ascending=False).head(15)

    stacked_bar_data = {
        "manufacturers": list(man_vs_price.index),
        "price": ['price'] + list(man_vs_price["price"].values.round(3)),
        "odometer": ['odometer'] + list(man_vs_price["odometer"].values.round(3))
    }

    treemap_l1 = [
        [k, v] for k, v in df_time_filtered["manufacturer"].value_counts().head(20).to_dict().items()
    ]
    treemap_l2 = []
    if "manufacturer" in args:
        treemap_l2 = [
            [k, v] for k, v in df_filtered["type"].value_counts().to_dict().items()
        ]
    treemap_data = {
        "level_1": list(treemap_l1),
        "level_2": list(treemap_l2)
    }

    total_sales_count = len(df_filtered)
    average_cost = df_filtered["price"].mean()
    max_sale_model_count = df_filtered["model"].value_counts(
    ).sort_values(ascending=False).head(1)

    max_sale_manufacturer = df_filtered.loc[df_filtered["model"] ==
                                            max_sale_model_count.index[0]]["manufacturer"].head(1).values[0]

    summary_data = {
        "total_sales_count": float(total_sales_count),
        "average_cost": float(round(average_cost, 3)),
        "max_sale_manufacturer": max_sale_manufacturer,
        "max_sale_model": str(max_sale_model_count.index[0]),
        "max_sale_count": int(max_sale_model_count[0])
    }

    return {
        "map_data": state_counts,
        "pie_data": condition_counts,
        "line_data": color_cyl_data,
        "stacked_bar_data": stacked_bar_data,
        "treemap_data": treemap_data,
        "summary_data": summary_data
    }


if __name__ == '__main__':
    app.run(debug=True)
