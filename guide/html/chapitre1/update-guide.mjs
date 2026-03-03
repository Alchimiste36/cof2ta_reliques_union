// Met à jour les pages du guide du système
main()

async function main() {
  const compendiumName = "cof2ta_reliques_union.reliquesunion-journaux"

  // Fait le lien entre un fichier html et l'id d'une page de journal
  const fileName_pageId = {
    a_synthese_chapitre: "Z0abiEPGzxejwOBF",
    b_rendez_vous_discret: "g5CSNs2GryY1Na5S",
    c_auberge_passage_gourmand: "YPO3NqvD0S8IUdT6",
    d_cite_ispier_investigation: "1jOo546DM6TkdOvM",
    e_direction_arkarum: "IV59QKjWWgmiqXom",
    f_forterresse_etat_arkarum: "04v8PcYS8IBkYAuF",
    g_voyage_grandes_plaines: "Lf0DWVH4dFAockm5",
    h_rencontre_survivants: "Z55uweuWiJfu6NvF",
  }

  // Répertoire où se trouvent les fichiers html à partir du répertoire data
  const folderRef = "modules/cof2ta_reliques_union/guide/html/chapitre1/"
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
