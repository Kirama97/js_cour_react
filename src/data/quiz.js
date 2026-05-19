export const quizData = [
  // FACILE
  {
    id: 1,
    question: "Quelle est la manière correcte de déclarer une variable qui ne peut pas être réaffectée ?",
    options: [
      { text: "const", isCorrect: true },
      { text: "let", isCorrect: false },
      { text: "var", isCorrect: false },
      { text: "static", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "Le mot-clé `const` permet de déclarer une constante. Sa valeur (ou sa référence pour un objet) ne peut pas être réaffectée."
  },
  {
    id: 2,
    question: "Comment afficher un message dans la console du navigateur ?",
    options: [
      { text: "console.log('Message')", isCorrect: true },
      { text: "print('Message')", isCorrect: false },
      { text: "echo 'Message'", isCorrect: false },
      { text: "document.write('Message')", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "`console.log()` est la méthode standard en JavaScript pour envoyer des messages dans la console de débogage."
  },
  {
    id: 3,
    question: "Que retourne `typeof 'Bonjour'` ?",
    options: [
      { text: "'string'", isCorrect: true },
      { text: "'text'", isCorrect: false },
      { text: "'char'", isCorrect: false },
      { text: "'word'", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "En JavaScript, le type d'une chaîne de caractères est `'string'`."
  },
  {
    id: 4,
    question: "Comment créer une fonction en JavaScript ?",
    options: [
      { text: "function maFonction() {}", isCorrect: true },
      { text: "def maFonction() {}", isCorrect: false },
      { text: "create maFonction() {}", isCorrect: false },
      { text: "func maFonction() {}", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "On utilise le mot-clé `function` suivi du nom de la fonction, de parenthèses et d'accolades."
  },
  {
    id: 5,
    question: "Quel opérateur permet de vérifier l'égalité stricte (valeur et type) ?",
    options: [
      { text: "===", isCorrect: true },
      { text: "==", isCorrect: false },
      { text: "=", isCorrect: false },
      { text: "!==", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "`===` vérifie que les deux opérandes sont identiques à la fois en valeur et en type, sans conversion implicite."
  },
  {
    id: 6,
    question: "Comment ajouter un élément à la fin d'un tableau ?",
    options: [
      { text: "tableau.push(element)", isCorrect: true },
      { text: "tableau.pop()", isCorrect: false },
      { text: "tableau.unshift(element)", isCorrect: false },
      { text: "tableau.add(element)", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "La méthode `push()` ajoute un ou plusieurs éléments à la fin d'un tableau et retourne sa nouvelle longueur."
  },
  {
    id: 7,
    question: "Que signifie DOM ?",
    options: [
      { text: "Document Object Model", isCorrect: true },
      { text: "Data Object Model", isCorrect: false },
      { text: "Document Orientation Model", isCorrect: false },
      { text: "Display Object Management", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "Le Document Object Model (DOM) est une interface de programmation pour les documents HTML et XML, représentant la page comme des nœuds et des objets."
  },
  {
    id: 8,
    question: "Comment commenter une ligne de code en JavaScript ?",
    options: [
      { text: "// Ceci est un commentaire", isCorrect: true },
      { text: "<!-- Ceci est un commentaire -->", isCorrect: false },
      { text: "/* Ceci est un commentaire */", isCorrect: false },
      { text: "# Ceci est un commentaire", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "Les doubles slash `//` servent à commenter une seule ligne. `/* ... */` est utilisé pour des commentaires multi-lignes."
  },
  {
    id: 9,
    question: "Quel événement se déclenche lorsqu'on clique sur un élément HTML ?",
    options: [
      { text: "onclick", isCorrect: true },
      { text: "onhover", isCorrect: false },
      { text: "onpress", isCorrect: false },
      { text: "onmouse", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "L'attribut ou l'événement `onclick` (ou `click` via addEventListener) détecte un clic de souris."
  },
  {
    id: 10,
    question: "Laquelle de ces valeurs est un booléen ?",
    options: [
      { text: "true", isCorrect: true },
      { text: "\"true\"", isCorrect: false },
      { text: "1", isCorrect: false },
      { text: "null", isCorrect: false }
    ],
    difficulty: "facile",
    explanation: "En JavaScript, `true` et `false` sont les deux seules valeurs de type booléen."
  },

  // MOYEN
  {
    id: 11,
    question: "Que retourne `Boolean('')` (une chaîne vide) ?",
    options: [
      { text: "false", isCorrect: true },
      { text: "true", isCorrect: false },
      { text: "undefined", isCorrect: false },
      { text: "null", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "Une chaîne vide `''` est une valeur 'falsy'. Sa conversion booléenne donne `false`."
  },
  {
    id: 12,
    question: "Comment définir une fonction fléchée ?",
    options: [
      { text: "const maFonction = () => {}", isCorrect: true },
      { text: "function => maFonction() {}", isCorrect: false },
      { text: "const maFonction() => {}", isCorrect: false },
      { text: "=> function() {}", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "Les fonctions fléchées (Arrow Functions) introduites avec ES6 utilisent la syntaxe `() => {}`."
  },
  {
    id: 13,
    question: "Quelle méthode permet de transformer une chaîne JSON en objet JavaScript ?",
    options: [
      { text: "JSON.parse()", isCorrect: true },
      { text: "JSON.stringify()", isCorrect: false },
      { text: "JSON.toObject()", isCorrect: false },
      { text: "Object.fromJSON()", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "`JSON.parse()` prend une chaîne de caractères JSON valide et construit l'objet JavaScript correspondant."
  },
  {
    id: 14,
    question: "Que fera `[1, 2, 3].map(x => x * 2)` ?",
    options: [
      { text: "Retourne [2, 4, 6]", isCorrect: true },
      { text: "Modifie le tableau original en [2, 4, 6]", isCorrect: false },
      { text: "Retourne 12", isCorrect: false },
      { text: "Provoque une erreur", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "La méthode `map()` crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément."
  },
  {
    id: 15,
    question: "Quel mot-clé est utilisé pour gérer une erreur dans un bloc try ?",
    options: [
      { text: "catch", isCorrect: true },
      { text: "error", isCorrect: false },
      { text: "finally", isCorrect: false },
      { text: "except", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "La structure complète est `try { ... } catch (e) { ... }` pour capturer et gérer les exceptions."
  },
  {
    id: 16,
    question: "Que retourne `typeof NaN` ?",
    options: [
      { text: "'number'", isCorrect: true },
      { text: "'NaN'", isCorrect: false },
      { text: "'undefined'", isCorrect: false },
      { text: "'object'", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "Même si NaN signifie 'Not-A-Number', son type de donnée technique en JavaScript est 'number'."
  },
  {
    id: 17,
    question: "Comment sélectionner tous les éléments ayant la classe 'titre' ?",
    options: [
      { text: "document.querySelectorAll('.titre')", isCorrect: true },
      { text: "document.querySelector('.titre')", isCorrect: false },
      { text: "document.getElementByClass('titre')", isCorrect: false },
      { text: "document.find('.titre')", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "`querySelectorAll` retourne une NodeList statique contenant tous les éléments correspondant au sélecteur CSS fourni."
  },
  {
    id: 18,
    question: "Quel est le résultat de `5 + '5'` ?",
    options: [
      { text: "'55'", isCorrect: true },
      { text: "10", isCorrect: false },
      { text: "NaN", isCorrect: false },
      { text: "Une erreur", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "Lorsque l'opérateur `+` implique une chaîne de caractères, JavaScript convertit l'autre opérande en chaîne et les concatène."
  },
  {
    id: 19,
    question: "Que fait la méthode `Array.filter()` ?",
    options: [
      { text: "Crée un nouveau tableau avec les éléments qui passent le test fourni", isCorrect: true },
      { text: "Supprime un élément du tableau", isCorrect: false },
      { text: "Trouve le premier élément correspondant", isCorrect: false },
      { text: "Modifie tous les éléments du tableau", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "`filter()` ne modifie pas le tableau d'origine, il retourne un nouveau tableau contenant uniquement les éléments validant la condition."
  },
  {
    id: 20,
    question: "Dans le DOM, à quoi sert `addEventListener` ?",
    options: [
      { text: "À attacher une fonction qui sera appelée lorsqu'un événement spécifique se produit", isCorrect: true },
      { text: "À créer un nouvel élément HTML", isCorrect: false },
      { text: "À modifier le style d'un élément", isCorrect: false },
      { text: "À ajouter des écouteurs réseau", isCorrect: false }
    ],
    difficulty: "moyen",
    explanation: "C'est la méthode recommandée pour assigner des écouteurs d'événements (comme 'click', 'scroll') sur les nœuds du DOM."
  },

  // DIFFICILE
  {
    id: 21,
    question: "Que retourne `typeof null` ?",
    options: [
      { text: "'object'", isCorrect: true },
      { text: "'null'", isCorrect: false },
      { text: "'undefined'", isCorrect: false },
      { text: "'boolean'", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "C'est un bug historique bien connu de JavaScript ! L'opérateur `typeof` retourne 'object' lorsqu'il est appliqué à `null`."
  },
  {
    id: 22,
    question: "Dans une fonction classique (non fléchée), à quoi fait référence `this` s'il est appelé globalement (non mode strict) ?",
    options: [
      { text: "L'objet global (window dans un navigateur)", isCorrect: true },
      { text: "La fonction elle-même", isCorrect: false },
      { text: "undefined", isCorrect: false },
      { text: "null", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "Dans le contexte global ou dans une fonction simple (sans 'use strict'), `this` pointe vers l'objet global (window)."
  },
  {
    id: 23,
    question: "Que représente une Promesse (Promise) en JavaScript ?",
    options: [
      { text: "Un objet représentant l'achèvement ou l'échec d'une opération asynchrone", isCorrect: true },
      { text: "Une fonction qui s'exécute avec un délai", isCorrect: false },
      { text: "Un type de boucle infini", isCorrect: false },
      { text: "Une méthode de sécurisation des données", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "Les promesses sont le mécanisme fondamental pour gérer l'asynchronisme moderne (avant l'arrivée de async/await qui repose sur elles)."
  },
  {
    id: 24,
    question: "Quelle est la particularité d'une closure (fermeture) en JavaScript ?",
    options: [
      { text: "Elle permet à une fonction de mémoriser et d'accéder à son contexte lexical parent même après son exécution", isCorrect: true },
      { text: "Elle empêche la modification des variables globales", isCorrect: false },
      { text: "Elle ferme automatiquement le navigateur", isCorrect: false },
      { text: "Elle crypte le code source", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "Une closure (fermeture) est une fonction qui 'se souvient' des variables de son environnement de création, même si celui-ci a terminé son exécution."
  },
  {
    id: 25,
    question: "Comment s'appelle le concept permettant à des variables `var` d'être accédées avant leur déclaration (retournant undefined) ?",
    options: [
      { text: "Le Hoisting (Hissage)", isCorrect: true },
      { text: "Le Bubbling", isCorrect: false },
      { text: "Le Shadowing", isCorrect: false },
      { text: "L'Event Loop", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "Le hoisting déplace les déclarations de variables (var) et de fonctions au sommet de leur portée lexicale lors de la phase de compilation."
  },
  {
    id: 26,
    question: "Que fait `Object.freeze(obj)` ?",
    options: [
      { text: "Il empêche l'ajout, la suppression et la modification des propriétés de l'objet", isCorrect: true },
      { text: "Il met en pause l'exécution du script", isCorrect: false },
      { text: "Il crypte les données de l'objet", isCorrect: false },
      { text: "Il transforme l'objet en chaîne JSON", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "`Object.freeze()` gèle un objet : il ne peut plus du tout être modifié (shallow freeze)."
  },
  {
    id: 27,
    question: "Quelle est l'utilité du `Event Loop` (boucle d'événements) ?",
    options: [
      { text: "Gérer l'exécution asynchrone en surveillant la Call Stack et la file d'attente (Callback Queue)", isCorrect: true },
      { text: "Répéter une animation en CSS", isCorrect: false },
      { text: "Écouter les clics de souris indéfiniment", isCorrect: false },
      { text: "Empêcher le navigateur de crasher", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "Le JavaScript étant mono-thread, l'Event Loop permet de traiter les opérations asynchrones de manière non bloquante."
  },
  {
    id: 28,
    question: "Quel est le résultat de `[] == ![]` ?",
    options: [
      { text: "true", isCorrect: true },
      { text: "false", isCorrect: false },
      { text: "TypeError", isCorrect: false },
      { text: "undefined", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "Énigme JS classique : `![]` devient `false` (car un tableau est truthy). On compare `[] == false`. `[]` est converti en chaîne vide `''`, puis en `0`. `false` devient `0`. Donc `0 == 0`."
  },
  {
    id: 29,
    question: "À quoi sert le mot-clé `yield` ?",
    options: [
      { text: "À mettre en pause et reprendre une fonction génératrice (function*)", isCorrect: true },
      { text: "À forcer l'arrêt d'une boucle", isCorrect: false },
      { text: "À remplacer `return` dans les fonctions normales", isCorrect: false },
      { text: "À bloquer le thread principal", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "`yield` est utilisé exclusivement à l'intérieur des générateurs (`function*`) pour retourner une valeur intermédiaire et pauser l'exécution."
  },
  {
    id: 30,
    question: "Que fait l'opérateur de coalescence des nuls `??` ?",
    options: [
      { text: "Il retourne l'opérande de droite seulement si celui de gauche est null ou undefined", isCorrect: true },
      { text: "Il retourne toujours la valeur la plus grande", isCorrect: false },
      { text: "Il retourne la valeur de droite si celle de gauche est falsy (comme 0 ou '')", isCorrect: false },
      { text: "Il lance une erreur si une valeur est nulle", isCorrect: false }
    ],
    difficulty: "difficile",
    explanation: "Contrairement à `||` qui vérifie les valeurs 'falsy', `??` vérifie strictement la nullité (`null` ou `undefined`)."
  }
];
