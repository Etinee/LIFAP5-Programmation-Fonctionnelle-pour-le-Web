// Tests unitaires pour le TP2

suite("Tests pour la fonction garde_entiers_pairs",
      function() { // la suite est mise en place via un callback

        // Un premier test
        test("On vérifie que le résultat ne contient que des entiers pairs",
             function() { // fonction anonyme qui défini ce que le test va faire
               const t = [1,2,3,4];
               const resultat_attendu = [2,4];
               chai.assert.deepEqual(garde_entiers_pairs(t), resultat_attendu);
             });

        // Un autre test
        test("On vérifie que le résultat ne contient que des nombres",
             function() {
               const t = ["a","2",3,4];
               garde_entiers_pairs(t).forEach(v => chai.assert.isNumber(v));
             });

        // Test de non perte
        test("On vérifie que tous les entiers pairs sont renvoyés",
             function() {
               const t = [2,4,6,8];
               const resultat_attendu = [2,4,6,8];
               chai.assert.deepEqual(garde_entiers_pairs(t), resultat_attendu);
             });
      });

suite("Tests pour la fonction trie_articles_date",
      function() {
        // TODO: à compléter
        print(trie_articles_date(donnees_exemple));
      });

suite("Tests pour la fonction filtre_mois_annee",
      function() {
        // TODO: à compléter
      });

// TODO ajouter des suites de tests pour le 3.3
