import React, { useState } from 'react';
import JSZip from 'jszip';

const plombiers = [
  { nom: "HOUEGBE Abraham", telephone: "0143126087" },
  { nom: "KPOSSOU Joël", telephone: "0166943999" },
  { nom: "HOUNKONNOU Wilfried", telephone: "0168440933" },
  { nom: "HOUEGBE Ezekiel", telephone: "0143126086" },
  { nom: "HOUGBO Joseph", telephone: "0156609352" },
  { nom: "TOLOME Antoine", telephone: "0194007193" },
  { nom: "MELOME Ghislain", telephone: "0166762877" },
  { nom: "KOUDOUVO Wilfried", telephone: "0194192534" },
  { nom: "HOUNKPE Marc Vérone", telephone: "0156187966" },
  { nom: "ABODO Charlemagne", telephone: "0156433863" },
  { nom: "KPOSSILANDE Geraldo", telephone: "0157217841" },
  { nom: "SOSSOU Moïse", telephone: "0191286097" },
  { nom: "GUEDEGBE Gabin", telephone: "0161889823" },
  { nom: "KPLAKA Sylvain", telephone: "0152715859" },
  { nom: "TEKLE Rémi", telephone: "0169908974" },
  { nom: "AMOUSSOU Arnaud", telephone: "0161628869" },
  { nom: "DOMAGO Fabrice", telephone: "0168354750" },
  { nom: "AMANH Claude", telephone: "0166060889" },
  { nom: "AHOYO Elie", telephone: "0161555573" },
  { nom: "GODJETO Carlos", telephone: "0195860879" },
  { nom: "LINDJETO Modeste", telephone: "0162886893" },
  { nom: "SASSE Carmel", telephone: "0162378583" },
  { nom: "KPOVIESSI Ghislain", telephone: "0196017557" },
  { nom: "SOKPE Léandre", telephone: "0166238390" },
  { nom: "AZONKPONYE Théophile", telephone: "0157610415" },
  { nom: "ZOMADONON Mahunan Ghislain", telephone: "0166557331" },
  { nom: "GBEDO Derys", telephone: "0146737332" },
  { nom: "DEHOUMON Kevin Sourou", telephone: "0142453179" }
];

const generateContractsFromWordTemplate = async () => {
  for (const plombier of plombiers) {
    // Chemin vers le fichier local dans le dossier "public"
    const response = await fetch('/documents/modele.docx');  // Assurez-vous que le fichier est dans public/documents
    const arrayBuffer = await response.arrayBuffer();
    
    const zip = new JSZip();
    await zip.loadAsync(arrayBuffer);
    
    const documentXml = await zip.file("word/document.xml").async("string");
    const updatedXml = documentXml
      .replace(/\[NOM\]/g, plombier.nom)
      .replace(/\[TELEPHONE\]/g, plombier.telephone);
    
    zip.file("word/document.xml", updatedXml);
    
    const blob = await zip.generateAsync({ type: "blob" });
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Contrat_${plombier.nom.replace(/ /g, "_")}.docx`;
    link.click();
  }
};

const ContractGenerator = () => {
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = async () => {
    setLoading(true);
    await generateContractsFromWordTemplate();
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleGenerateClick} disabled={loading}>
        {loading ? 'Génération en cours...' : 'Générer tous les contrats'}
      </button>
    </div>
  );
};

export default ContractGenerator;
