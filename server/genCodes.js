const { randomBytes } = require("crypto");

const locations = [
  "Return Raum (Glasscheibe innen)",
  "Forum (vor den Klos)",
  "Forum (Mediotür)",
  "Foyer (Pinnwand)",
  "Keller (vor -102)",
  "Physikraum (Glastür)",
  "Computerraum (Tür)",
  "Lehrerbibliothek (Pinnwand rechts)",
  "Aula Tür (von innen)",
  "3. Etage (Fußboden an der Treppe)",
  "Erdgeschoss (Im Flur von 020)",
  "1. Etage (Sekretariat Pinnwand)",
];

const codes = locations.map((location, idx) => {
  return {
    code: randomBytes(128).toString("hex"),
    item: idx,
    location: location,
  };
});

console.log(JSON.stringify(codes))