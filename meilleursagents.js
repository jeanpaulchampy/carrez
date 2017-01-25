var minprix=0;
var meanprix=0;
var maxprix=0;
var typeBien="";//TODO recupération du type bien
var villeCP="";//TODO recupération de la villeCP


//TODO utiliser la ville pout trouver le prix

var jsonMeilleursAgents='{
  +'"prix minimum m²":minprix'
  +'"prix moyen m²":meanprix'
  +'"prix maximum m²":maxprix'
  +'"type de bien":typeBien'
+}';

function meilleursagents(typeBien,villeCP)
{
  return jsonMeilleursAgents;
}
