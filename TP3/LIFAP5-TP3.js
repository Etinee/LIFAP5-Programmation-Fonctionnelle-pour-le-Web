/* eslint-disable no-unused-vars */
////////////////////////////////////////////////////////////////////////////////
// données exemple, qui seront remplacées par des données chargées dynamiquement
////////////////////////////////////////////////////////////////////////////////
const donnees_exemple = [
  {
    titre: 'CM3 : programmation fonctionnelle en js',
    date: '2017-02-27',
    contenu: `Ce cours introduit les notions de programmation avec des fonctions d'ordre supérieur.

Après avoir revu la définition de fonction, on abordera les fonctions renvoyées en résultat, ainsi que la l'utilisation de valeurs extérieures à la définition de la fonction.

Outre la manipulation des fonctions commes objets de première classe, la notion de fermeture est un des principaux concepts à retenir de ce cours.`,
  },

  {
    titre: 'CM1 : introduction à js (1/2)',
    date: '2017-01-30',
    contenu: `Ce cours décrit les bases du langage JavaScript.

On y verra en particulier les valeurs, les types, les structures de tableau et de dictionnaire. Enfin on abordera la définition des fonctions et les méthodes.`,
  },

  {
    titre: 'CM2 : introduction à js (2/2)',
    date: '2017-02-06',
    contenu: `Ce cours poursuit la présentation du langage Javascript.

Dans ce cours, on abordera les APIs de chaînes de caractères et de tableaux, ainsi que les fonctions passées en argument.`,
  },

  {
    titre: 'CM4 : programmation asynchrone',
    date: '2017-03-06',
    contenu: `Ce cours aborde les notions de programmation asynchrone.

Après quelques notions fondamentales sur les fonction introduites via le lamnbda-calcul, ce cours abordera des constructions standard de programmation asynchrone, telle que les callbacks et les promesses.`,
  },

  {
    titre: "L'UE LIFAP5 est créée",
    date: '2016-09-01',
    contenu:
      "Création de l'UE LIFAP5: programmation fonctionnelle pour le Web.\n\nCette UE aborde la programmation fonctionnelle à travers Javascript et la programmation Web.",
  },
];

const baseUrl =
  'https://perso.liris.cnrs.fr/emmanuel.coquery/enseignement/lifap5/TP3/getjson.php?file=';
const nouvellesUrl = `${baseUrl}nouvelles.json`;
const annuaireUrl = `${baseUrl}annuaire.json`;

////////////////////////////////////////////////////////////////////////////////
// Fonctions de RENDU : génération de HTML à partir des données des nouvelles :
// mises en forme de titre, de liste de nouvelle, génération de liste d'années
////////////////////////////////////////////////////////////////////////////////

// transforme une nouvelle en un item HTML à partir de son titre et de sa date
function formate_titre(nouvelle) {
  return `<li>${nouvelle.date}: ${nouvelle.titre}</li>`;
}

// transforme une liste de nouvelles en une énumération HTML
function liste_nouvelles_html(nouvelles) {
  const nouvelles_html = nouvelles.map(formate_titre).join('\n');
  return `<ul>\n${nouvelles_html}</ul>\n`;
}

// transforme une liste de valeur en un liste (pour les select HTML)
// prettier-ignore
function liste_to_options(valeurs) {
  /* /!\ TODO REECRIRE CETTE FONCTION avec map, join, des templates literal uniquement avec des const sans for*/
  // eslint-disable-next-line no-var
  var str = "";
  // eslint-disable-next-line no-var
  for ( var i = 0; 
        i < valeurs.length;
        i++)
  {
    str += '  <option value="' + valeurs[i] + '"'
  if(i == 0)
  str += 'selected="true"';
    str += '>' + valeurs[i] + '</option>\n';
  }
  return str;

}

////////////////////////////////////////////////////////////////////////////////
// Fonctions outils et manipulation de liste de nouvelles
////////////////////////////////////////////////////////////////////////////////

function elimine_doublons_trie(liste) {
  /* /!\ TODO EXPLIQUER ce que fait cette fonction*/
  const asSet = new Set(liste);
  let asTab = Array.from(asSet.values());
  asTab.sort();
  return asTab;
}

// trie une liste de nouvelles par date (selon l'ordre lexicographique)
function trie_articles_date(nouvelles) {
  const res = Array.from(nouvelles);
  res.sort((n1, n2) => (n1.date < n2.date ? 1 : n1.date > n2.date ? -1 : 0));
  return res;
}

// extrait la liste des années d'une liste de nouvelles (sans doublons)
function annees(nouvelles) {
  return elimine_doublons_trie(
    nouvelles.map((n) => new Date(n.date)).map((d) => d.getFullYear())
  );
}

function mois_de_annee(nouvelles, annee) {
  /* /!\ TODO EXPLIQUER ce que fait cette fonction*/
  const nAnnee = Number(annee);
  let filtered = nouvelles
    .map((n) => new Date(n.date))
    .filter((d) => d.getFullYear() === nAnnee)
    .map((d) => d.getMonth() + 1);
  return elimine_doublons_trie(filtered);
}

// filtre une liste de nouvelle à celles qui ont l'année ET le mois passés en paramètres
function filtre_mois_annee(nouvelles, mois, annee) {
  const nAnnee = Number(annee);
  const nMois = Number(mois);
  let filtered = nouvelles
    .filter((n) => new Date(n.date).getFullYear() === nAnnee)
    .filter((n) => new Date(n.date).getMonth() + 1 === nMois);
  return filtered;
}

////////////////////////////////////////////////////////////////////////////////
// Fonctions de génération et de mises à jour d'interface HTML
////////////////////////////////////////////////////////////////////////////////

function maj_liste_nouvelles(nouvelles, mois, annee) {
  console.debug(`CALL maj_liste_nouvelles([${nouvelles}],${mois},${annee})`);
  const filtrees = filtre_mois_annee(nouvelles, mois, annee);
  const liste_html = liste_nouvelles_html(filtrees);
  document.getElementById('elt-nouvelles').innerHTML = liste_html;
}

function maj_annees(nouvelles) {
  /* /!\ TODO EXPLIQUER ce que fait cette fonction*/
  console.debug(`CALL maj_annees([${nouvelles}])`);
  const annee_html = liste_to_options(annees(nouvelles));
  document.getElementById('select-annee').innerHTML = annee_html;
}

// fonction pour générer le contenu de la liste des mois d'une année donnée
function maj_mois(nouvelles, annee) {
  console.debug(`CALL maj_mois([${nouvelles}, ${annee}])`);
  /* /!\ TODO MODIFIER CETTE FONCTION */
  const select = document.getElementById('select-mois');
  select.innerHTML = `
  <option value="1" selected="true">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  <option value="11">11</option>
  <option value="12">12</option>`;
  maj_liste_nouvelles(nouvelles, select.value, annee);
}

function change_annee() {
  /* /!\ TODO EXPLIQUER ce que fait cette fonction*/
  console.debug(`CALL change_annee()`);
  const annee = document.getElementById('select-annee').value;
  maj_mois(trie_articles_date(donnees_exemple), annee);
}

// fonction appellée lorsqu'on change la liste des mois
function change_mois() {
  console.debug(`CALL change_mois()`);
  const mois = document.getElementById('select-mois').value;
  const annee = document.getElementById('select-annee').value;
  maj_liste_nouvelles(trie_articles_date(donnees_exemple), mois, annee);
}

// prend une liste d'ID HTML id_contenus et les rens invisibles sur la page
// puis rend visible l'ID id_contenu_a_afficher (s'il existe)
function masque_affiche_contenus(id_contenus, id_contenu_a_afficher) {
  console.debug(
    `CALL masque_affiche_contenus([${id_contenus}],${id_contenu_a_afficher})`
  );
  id_contenus.map(function(idc) {
    document.getElementById(idc).style.display = 'none';
  });
  if (id_contenu_a_afficher !== undefined)
    document.getElementById(id_contenu_a_afficher).style.display = 'block';
}

// Fonction principale appelée pour générer les menus HTML
function init_menus() {
  console.debug(`CALL init_menus()`);
  maj_annees(donnees_exemple);
  document.getElementById('select-annee').onchange = change_annee;
  document.getElementById('select-mois').onchange = change_mois;
  change_annee();
}

////////////////////////////////////////////////////////////////////////////////
// Fonction permettant de charger des données depuis une ressource séparée
////////////////////////////////////////////////////////////////////////////////
function charge_donnees(url, callback) {
  return fetch(url) 
    .then((response) => { console.log(response); return response.text() })
    .then((txt) => {console.log(txt); return JSON.parse(txt)})
    .then(callback);
}

////////////////////////////////////////////////////////////////////////////////
// Code permettant d'utiliser les fonctions ci-dessus dans la page LIFAP5-TP3.html
////////////////////////////////////////////////////////////////////////////////
// garde pour ne pas exécuter dans la page des tests unitaires

const eltNouvelles = document.getElementById('elt-nouvelles');

if (document.getElementById('mocha') === null) {
  eltNouvelles.innerHTML = liste_nouvelles_html(donnees_exemple);
  init_menus();
}
