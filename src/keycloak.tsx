import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://localhost:8080/",
    realm: "Storefront",
    clientId: "storefront-web",
});


console.log(keycloak);

export default keycloak;