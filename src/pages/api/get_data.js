import axios from "axios";

export default async function handler(req, res) {
    const { yearStart, yearEnd, manufacturer, state } = req.body;
    const data = await (
        await axios.post(
            `http://nisargtest16.pythonanywhere.com/get_data`,
            {
                year_start: yearStart,
                year_end: yearEnd,
                state: state || "all",
                manufacturer: manufacturer || "all",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    ).data;
    res.status(200).json(data);
}
