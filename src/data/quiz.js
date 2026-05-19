export const quizData = [
  {
    id: 1,
    question: "Quelle est la manière correcte de déclarer une variable qui ne peut pas être réaffectée ?",
    options: ["var", "let", "const", "static"],
    correctAnswer: 2,
    explanation: "Le mot-clé `const` permet de déclarer une variable dont la référence ne peut pas être réaffectée. Contrairement à `let` ou `var`."
  },
  {
    id: 2,
    question: "Quel sera le résultat de : `typeof null` ?",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correctAnswer: 2,
    explanation: "C'est un bug historique bien connu de JavaScript ! L'opérateur `typeof` retourne 'object' lorsqu'il est appliqué à `null`."
  },
  {
    id: 3,
    question: "Comment ajouter un élément à la fin d'un tableau ?",
    options: ["tableau.push(element)", "tableau.pop()", "tableau.unshift(element)", "tableau.shift()"],
    correctAnswer: 0,
    explanation: "`push()` ajoute un ou plusieurs éléments à la fin d'un tableau. `unshift()` ajoute au début."
  },
  {
    id: 4,
    question: "Lequel de ces opérateurs compare à la fois la valeur ET le type ?",
    options: ["==", "=", "!==", "==="],
    correctAnswer: 3,
    explanation: "L'opérateur d'égalité stricte `===` vérifie que les deux opérandes sont de la même valeur ET du même type, sans faire de conversion implicite."
  },
  {
    id: 5,
    question: "Que retourne l'expression `Boolean('')` (chaîne vide) ?",
    options: ["true", "false", "undefined", "null"],
    correctAnswer: 1,
    explanation: "Une chaîne de caractères vide `''` est considérée comme 'falsy' en JavaScript, sa conversion en booléen donne donc `false`."
  }
];
