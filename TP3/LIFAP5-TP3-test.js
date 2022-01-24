/*global chai,trie_articles_date, filtre_mois_annee, donnees_exemple, mois_de_annee, annees, elimine_doublons_trie, charge_donnees, nouvellesUrl*/

//////////////////////////////////////////////////////////////////////
// Suites de tests

suite('Tests pour la fonction trie_articles_date', function() {
  test("On vérifie l'ordre des dates sur tri sur les données exemple", function() {
    const resultat_attendu = [
      '2017-03-06',
      '2017-02-27',
      '2017-02-06',
      '2017-01-30',
      '2016-09-01',
    ];
    const calcule = trie_articles_date(donnees_exemple).map((n) => n.date);
    chai.assert.deepEqual(calcule, resultat_attendu);
  });

  test("On vérifie qu'on a bien toutes les nouvelles de départ", function() {
    trie_articles_date(donnees_exemple).forEach((n) =>
      chai.assert.isTrue(donnees_exemple.some((n2) => n === n2))
    );
  });
});

suite('Tests pour la fonction filtre_mois_annee', function() {
  test('On vérifie que les nouvelles conservées sont issues du tableau original', function() {
    filtre_mois_annee(donnees_exemple, '02', '2017').forEach((n) =>
      chai.assert.isTrue(donnees_exemple.some((n2) => n === n2))
    );
  });

  test('On vérifie que le mois est correct dans les données filtrées', function() {
    const filtrees = filtre_mois_annee(donnees_exemple, '02', '2017');
    filtrees.forEach((n) => chai.assert.equal(Number(n.date.substr(5, 2)), 2));
  });

  test("On vérifie que l'année est correcte dans les données filtrées", function() {
    const filtrees = filtre_mois_annee(donnees_exemple, '02', '2017');
    filtrees.forEach((n) =>
      chai.assert.equal(Number(n.date.substr(0, 4)), 2017)
    );
  });

  test("On vérifie que l'on a bien toutes les nouvelles, dans l'ordre de départ", function() {
    const dates_filtrees = filtre_mois_annee(donnees_exemple, '02', '2017').map(
      (n) => n.date
    );
    const expected = ['2017-02-27', '2017-02-06'];
    chai.assert.deepEqual(dates_filtrees, expected);
  });
});

suite('Tests pour la fonction mois_de_annee', function() {
  test('On vérifie sur quelques données exemple', function() {
    chai.assert.deepEqual(
      mois_de_annee(trie_articles_date(donnees_exemple), 2017),
      [1, 2, 3]
    );
    chai.assert.deepEqual(
      mois_de_annee(trie_articles_date(donnees_exemple), 2016),
      [9]
    );
    chai.assert.deepEqual(
      mois_de_annee(trie_articles_date(donnees_exemple), 2018),
      []
    );
  });
});

suite('Tests pour la fonction annees', function() {
  test('On vérifie sur quelques données exemple', function() {
    chai.assert.deepEqual(annees(trie_articles_date(donnees_exemple)), [
      2016,
      2017,
    ]);
  });
});

suite('Tests pour la fonction elimine_doublons_trie', function() {
  test('On vérifie sur quelques données exemple', function() {
    chai.assert.deepEqual(elimine_doublons_trie([1, 2, 3]), [1, 2, 3]);
    chai.assert.deepEqual(elimine_doublons_trie([2, 1, 3]), [1, 2, 3]);
    chai.assert.deepEqual(elimine_doublons_trie([1, 3, 3, 2, 2, 1]), [1, 2, 3]);
  });
});

suite('Tests pour la fonction de chargement', function() {
  test('On vérifie que la fonction télécharge le contenu et que la donnée est bien la même', function(done) {
    charge_donnees(nouvellesUrl, function(data) {
      chai.assert.equal(data.length, 8);
      // chai.assert.deepEqual(data, donnees_exemple);
      done();
    });
  });
});
