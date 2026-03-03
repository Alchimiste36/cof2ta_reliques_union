// Met à jour les pages du guide du système
main()

async function main() {
  const compendiumName = "cof2ta_reliques_union.reliquesunion-journaux"

  // Fait le lien entre un fichier html et l'id d'une page de journal
  const fileName_pageId = {
    a_synthese_chapitre: "bM9aawjXFqfhRW9u",
    b_lavoise: "voxv6jpsMuuvq0hf",
    c_grande_route_ourann: "e1PWj2AJ2FQbQVo5",
    d_entree_foret: "boTGVqEMeKH3BJHs",
    e_village_arbre_mere: "3F3iyUWMlCXm87n3",
    f_temple_val_rouge: "SUM5EEjOJa7JXn0M",
  }

  // Répertoire où se trouvent les fichiers html à partir du répertoire data
  const folderRef = "modules/cof2ta_reliques_union/guide/html/chapitre2/"
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
