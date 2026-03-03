// Met à jour les pages du guide du système
main()

async function main() {
  const compendiumName = "cof2ta_reliques_union.reliquesunion-journaux"

  // Fait le lien entre un fichier html et l'id d'une page de journal
  const fileName_pageId = {
    a_synthese_chapitre: "V4NWx3wWZJM8NH39",
    b_defile_crocs_acier: "vXleD1oYQFKyvzog",
    c_attaque_toile_vivante: "UbGFHO15JlFxlSUS",
    d_suite_voyage: "xn2tLY69EZ5GpWu9",
    e_arrivee_vallee_novrak: "LI4an2BZdwglIaFZ",
    f_investigations: "NWuIIQG4gD5FBDzt",
    g_rencontre_timaor_dunclin: "QaRVbzrZHN52mNpu",
    h_preparation_voyage: "S4D4KzPWf7tUJS3B",
    i_voyage_etendues_sauvages: "ZajdGvjbWnJnZG6B",
  }

  // Répertoire où se trouvent les fichiers html à partir du répertoire data
  const folderRef = "modules/cof2ta_reliques_union/guide/html/chapitre4/"
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
