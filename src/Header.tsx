import { useKeycloak } from "@react-keycloak/web";
import {Link, useNavigate} from "react-router-dom";

export function Header() {
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();

    function onLoginClick() {
        keycloak.login();
    }

    function onLogoutClick() {
        navigate("/");
        keycloak.logout();
    }

    return (
        <div className="border-2 border-gray-500 flex justify-between">
            {/* TODO: Nav class with an array of links. */}
            <nav>
                <ul className="flex flex-row py-1">
                    <li className="flex-1 mx-1">
                        <Link to="/">Home</Link>
                    </li>
                    {keycloak.authenticated &&
                        <li className="flex-1 mx-1">
                            <Link to="/secured">Secured</Link>
                        </li>
                    }
                    {keycloak.hasRealmRole('vendor') &&
                        <li className="flex-1 mx-1">
                            <Link to="/vendor">Vendor</Link>
                        </li>
                    }
                </ul>
            </nav>
            {!keycloak.authenticated &&
                <button
                    className="border rounded-xl bg-blue-600 px-3 py-1 mx-1"
                    onClick={onLoginClick}>
                    Log In
                </button>
            }
            {!!keycloak.authenticated &&
                <button
                    type="button"
                    className="border rounded-xl bg-blue-600 px-3 py-1 mx-1"
                    onClick={onLogoutClick}>
                    Log out ({keycloak.tokenParsed?.preferred_username})
                </button>
            }
        </div>
    );
}