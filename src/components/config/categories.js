import feculentsImg from '../../assets/images/32x32/feculents.png';
import fruitsImg from '../../assets/images/32x32/fruits.png';
import fromageImg from '../../assets/images/32x32/fromage.png';
import dessertImg from '../../assets/images/32x32/dessert.png';
import * as viandeImg from '../../assets/images/32x32/viande.png';
import * as volailleImg from '../../assets/images/32x32/poulet.png';
import poissonImg from '../../assets/images/32x32/poisson.png';
import legumesImg from '../../assets/images/32x32/legumes.png';

const categ = [
  { nom: 'Entrée / Hors d\'oeuvre' , img: viandeImg },
  { nom: 'Soupe', img: feculentsImg },
  { nom: 'Salades', img: legumesImg },
  { nom: 'Plats principaux', img: dessertImg },
  { nom: 'Accompagnements', img: fruitsImg },
  { nom: 'Desserts', img: volailleImg },
  { nom: 'Collations', img: fromageImg },
  { nom: 'Petits déjeuner', img: poissonImg },
  { nom: 'Sandwiches', img: poissonImg },
  { nom: 'Sauces et tempettes', img: poissonImg },
  { nom: 'Vinaigrettes', img: poissonImg },
  { nom: 'Boissons', img: poissonImg },
];

export const categories = categ.map((cat,i) => {
  return {...cat,index: i}
})
