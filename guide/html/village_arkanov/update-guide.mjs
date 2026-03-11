// Met à jour les pages du guide du système
main()

async function main() {
  const compendiumName = "cof2ta_reliques_union.reliquesunion-journaux"

  // Fait le lien entre un fichier html et l'id d'une page de journal
  const fileName_pageId = {
    a_introduction: "HOLFyZID5264SJ75",
    a_grotte_prison: "KaN8MUqbIPPsXoyQ",
    zb_foret_interieure: "fh429wTzMRKO8X4G",
    c_potager_verger_compost: "13YUedrBxZY1CUBb",
    zd_preparation_alimentaire: "PKaXRrmLTYIoQkbS",
    e_place_du_village: "uoJIun8wTNjIEhYY",
    zf_ecole: "WB0bl6i0ApQZTpR3",
    zg_cuisine_collective: "QYs90mKhx9fHyy79",
    h_produits_finis_couture: "NDrkpxJE2qxi4A0X",
    zi_bougie_poterie: "3AL5tLVP6FLVPXw2",
    zj_forge: "w5pMCoYMA92Enjdp",
    k_four_artisanat: "2CbnDSbhN5kjd8nt",
    l_murailles_entrainement: "fqQEw5YAUk6zHgZm",
    zm_salle_commune_meditation: "eCfT2xaJISkNtjSp",
    zn_bibliotheque_etude_cloche: "trlohrGGHM0pfu6p",
    zo_apothicaire_medecine_herboriste: "5wcCUOCIIg6eaYVd",
    p_gestion_sculpture: "vv6fVlGxk0YXLq8F",
    q_coeur_arkanov: "IeiOoPvxliVcuC3Y",
    r_alambic: "obLqAf9asfalqU1K",
    s_grotte_ceremonie: "LBVEFbLnueNeTXNF",
    t_reserve_survie: "qgMFfrTyDpZr0Jl1",
    u_foret_exterieure: "6U8Fa6RAPPaQI8b4",
    v_salle_secrete: "lBjEqL0gUfpOScrP",
  }

  // Répertoire où se trouvent les fichiers html à partir du répertoire data
  const folderRef = "modules/cof2ta_reliques_union/guide/html/village_arkanov/"
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
