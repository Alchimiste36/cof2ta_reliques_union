// Met à jour les pages du guide du système
main()

async function main() {
  const compendiumName = "cof2ta_reliques_union.reliquesunion-journaux"

  // Fait le lien entre un fichier html et l'id d'une page de journal
  const fileName_pageId = {
    a_entree: "COPA0WiReOOfBbpu",
    b_passage_dortoir: "CjeRO3PdgVF1Oz6B",
    c_refectoire: "XJpVBk0VKqxKkxWA",
    d_bibliotheque: "ergxAh45DtavzO05",
    e_cuisine: "9PPArNN01B173plV",
    f_salle_priere: "HJa8jr0k56qhKIRc",
    g_dortoir_suivante: "1Dqc4KilAutcnFRE",
    h_dortoir_gardienne: "89UUFu6rYJBjW1N9",
    i_dortoirs_acolytes: "8P9z7YVMU0hgAm3u",
    j_garde_manger: "k9OVETiVkiA6kZQR",
    k_sanitaires: "7Rp6kywolxN3UdYu",
    l_grande_salle_union: "gpcbauQQ8TO3DiEB",
    s_salle_secrete: "KtYYiqeXY1WAxSk1",
  }

  // Répertoire où se trouvent les fichiers html à partir du répertoire data
  const folderRef = "modules/cof2ta_reliques_union/guide/html/temple_val_rouge/"
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
