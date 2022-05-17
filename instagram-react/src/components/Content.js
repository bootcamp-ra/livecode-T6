import Storys from "./Storys";
import Feed from "./Feed";
import Sidebar from "./Sidebar";

export default function Content () {
    return (
        <div className="container">
        <div className="container-principal">
            <Storys />
            <Feed />
            <div className="actions-mobile">
                <ion-icon name="home"></ion-icon>
                <ion-icon name="search-outline"></ion-icon>
                <ion-icon name="add-circle-outline"></ion-icon>
                <ion-icon name="heart-outline"></ion-icon>
                <ion-icon name="person-outline"></ion-icon>
            </div>
        </div>

        <div className="container-secundario">
            <Sidebar />
        </div>
        


    </div>
);
}