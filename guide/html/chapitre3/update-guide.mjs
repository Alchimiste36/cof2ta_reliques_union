// Met à jour les pages du guide du système
main()

async function main() {
  const compendiumName = "cof2ta_reliques_union.reliquesunion-journaux"

  // Fait le lien entre un fichier html et l'id d'une page de journal
  const fileName_pageId = {
    a_synthese_chapitre: "6NsXFyszsTemclPn",
    b_sortie_du_temple: "LGE60tt8kcHiQYBZ",
    c_et_maintenant: "pPAlLLMIEclfA4YV",
    d_retour_victorieux: "DYEz8oNQ4OcLZ4Te",
    e_retour_normal: "y5X3Kp9wthuwcCoq",
    f_retour_mouvemente: "kwMtQDN5t95pbjP6",
    g_intermede_ispier: "KWSvn79yt8Z056lX",
    h_festivites_discours: "tbCHg9xsciXhKtYI",
    i_retour_lanasir: "3Wro4FzwYLnaJN8X",
    j_rencontre_zagrenn: "JoWuu7l0J0l6Dtg5",
    k_investigations_ispier: "BgJSQx49MP1AWcGP",
    l_recherches_autres_villes: "V5F2XvsVDfviqdXn",
    m_autres_activites: "tRndvEe6SCYAaaG6",
    n_opportunites_pour_mj: "d9miuMwENmuQ1LVl",
    o_fin_intermede: "FGLuvrx2OHywnu5z",
  }

  // Répertoire où se trouvent les fichiers html à partir du répertoire data
  const folderRef = "modules/cof2ta_reliques_union/guide/html/chapitre3/"
  const filesList = await foundry.applications.apps.FilePicker.implementation.browse("data", folderRef)
  console.log("Liste des fichiers", filesList)

  // Seulement les fichiers html
  const htmlFiles = filesList.files.filter((f) => f.includes(".html"))
  console.log("Liste des fichiers html", htmlFiles)

  for (let file of htmlFiles) {
    filebase = file.replace(".html", "").replace(folderRef, "")
    let targetId = fileName_pageId[filebase]

    console.log("targetId", targetId)
    if (targetId) {
      for (let journal of game.packs.get(compendiumName)) {
        let journalpage = journal.pages.get(targetId)
        if (journalpage) {
          const fileData = await fetch(file)
          let filecontent = await fileData.text()
          journalpage.update({ "text.content": filecontent })
          console.log("Mise à jour réussie depuis le fichier :", file)
        }
      }
    }
  }
}
