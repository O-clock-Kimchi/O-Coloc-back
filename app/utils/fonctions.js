const Colocs = require('../models/Colocs.js')

function isValidName(name) {
    if (name.length < 4 || name.length > 50) {
        return false;
    }
    return true;
}

function isValidNameRegex(name) {
    const regex = /\bmerde\b|\bcouille\b|\bsaloperie\b|\bmerdes\b|\bcouilles\b|\bsaloperies\b|\bfuck\b|\bemmerd|\bemerd|\benmerd|\bchier\b|\bchié\b|\bchiée\b|\bchiant\b|\bchiants\b|\bchiante\b|\bchiantes\b|\bencul|\bniquer\b|\bnique\b|\bniques\b|\bniqué\b|\bniquée\b|\bnik ta\b|\bnike ta\b|\bnicke ta\b|\bconne\b|\bconnasse\b|\bconasse\b|\bsalope\b|\bsaloppe\b|\bpétasse\b|\bpetasse\b|\bpute\b|\bputte\b|\bputain\b|\bpoufiasse\b|\bpouffiasse\b|\bchieuse\b|\bchiarde\b|\bgrognasse\b|\bconnes\b|\bconnasses\b|\bconasses\b|\bsalopes\b|\bsaloppes\b|\bpétasses\b|\bpetasses\b|\bputes\b|\bputtes\b|\bputains\b|\bpoufiasses\b|\bpouffiasses\b|\bchieuses\b|\bchiardes\b|\bgrognasses\b|\bconnard\b|\bconard\b|\bsalaud\b|\bchieur\b|\bchiard\b|\bmerdeux\b|\bpédé\b|\btarlouze\b|\btrou du cul\b|\btrou-du-cul\b|\btrouduc\b|\btrou duc\b|\btrouduk\b|\bbranleur\b|\bconnards\b|\bconards\b|\bsalauds\b|\bchieurs\b|\bchiards\b|\bpédés\b|\btarlouzes\b|\btrous du cul\b|\btrous-du-cul\b|\btrouducs\b|\btrous duc\b|\btrouduks\b|\bbranleurs\b|\bpetit(\s|&nbsp;)*con\b|gros(\s|&nbsp;)*con\b|sale(\s|&nbsp;)*con\b|\bde con\b|\bun con\b|\bpetits(\s|&nbsp;)*cons\b|gros(\s|&nbsp;)*cons\b|sales(\s|&nbsp;)*cons\b|\bdes cons\b|petit(\s|&nbsp;)*pd|gros(\s|&nbsp;)*pd|sale(\s|&nbsp;)*pd|\bde pd|\bun pd\b|petits(\s|&nbsp;)*pd|sales(\s|&nbsp;)*pd|\bdes pd\b|\bva te faire\b|\bvas te faire\b|\ballez vous faire\b|\bdans le cul\b|\bmon cul\b|\bton cul\b|\bta gueule\b|\bvos gueules\b|\bde ta race\b|\btu pues du\b|\btu pues de la\b/i;
    return regex.test(name);
}

async function generateCodeOnUserLeave(colocId) {
    try {
        const coloc = await Colocs.findByPk(colocId);
        if (coloc) {
            const code = Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 8);
            await coloc.update({ lien_coloc: code, groupe_code_valid: code });
            console.log('Code généré avec succès pour la colocation :', colocId);
        } else {
            console.error('Colocation non trouvée lors de la génération du code pour la colocation :', colocId);
        }
    } catch (error) {
        console.error('Erreur lors de la génération du code pour la colocation :', error);
    }
}
module.exports= {generateCodeOnUserLeave, isValidName, isValidNameRegex};