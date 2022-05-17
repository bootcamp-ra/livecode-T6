import Icon from "./shared/Icon"
export default function Header () {
    return (
        <div className="topo">
        <div className="topo-container">
            <div className="logo-container">
                <ion-icon name="logo-instagram"></ion-icon>
                <div className="separador"></div>
                <img src="images/logo.png" className="logo" />        
            </div>
            <input type="text" placeholder="Pesquisar" />
            <div className="botoes-topo">
                <Icon icon="paper-plane-outline"/>
                <ion-icon name="compass-outline"></ion-icon>
                <ion-icon name="heart-outline"></ion-icon>
                <ion-icon name="person-outline"></ion-icon>
            </div>

        </div>
    </div>
    )
}