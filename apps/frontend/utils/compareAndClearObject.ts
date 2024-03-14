export const compareAndClearObject = <T>(myObject: T, compareObject: T): T => {
  const clearedObject: Partial<T> = {}; // Nous utiliserons un objet partiel pour stocker les propriétés différentes

  // Parcourir les propriétés de myObject
  for (const key in myObject) {
    // Vérifier si la propriété existe également dans compareObject
    if (Object.prototype.hasOwnProperty.call(compareObject, key)) {
      // Comparer les valeurs des propriétés
      if (myObject[key] !== compareObject[key]) {
        // Si les valeurs sont différentes, les stocker dans clearedObject
        clearedObject[key] = myObject[key];
      }
    }
  }

  // Retourner l'objet partiel converti en type T
  return clearedObject as T;
};
