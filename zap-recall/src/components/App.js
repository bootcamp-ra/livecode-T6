import {useState} from "react";
import Home from "./home/Home";
import Questions from "./questions/Questions";

export default function App () {

    const [visible, setVisible] = useState(true);

    return (
        <>
            { visible ? <Home setVisible={setVisible}/> : <Questions />}
        </>
    )
}