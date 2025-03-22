export const valideURLConvert = (name) => {
    const url = name
      ?.toString()               // Convertit en chaîne de caractères (si ce n'est pas déjà le cas)
      .replaceAll(" ", "-")      // Remplace tous les espaces par des tirets "-"
      .replaceAll(",", "-")      // Remplace toutes les virgules par des tirets "-"
      .replaceAll("&", "-")      // Remplace tous les "&" par des tirets "-"
    
    return url
  }
  