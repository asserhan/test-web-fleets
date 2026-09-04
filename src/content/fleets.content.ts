import { t, type Dictionary } from "intlayer";

const fleetsContent = {
  key: "fleets",
  content: {
    createFleet: t({
      fr: "Créer une flotte",
      en: "Create a fleet",
    }),
    back: t({
      fr: "Retour",
      en: "Back",
    }),
    help: t({
      fr: "Aide",
      en: "Help",
    }),
    yourRepertoire: t({
      fr: "Votre répertoire",
      en: "Your directory",
    }),
    titlePlaceholder: t({
      fr: "Titre",
      en: "Title",
    }),
    descriptionPlaceholder: t({
      fr: "Description",
      en: "Description",
    }),
    fleetLabel: t({
      fr: "Flotte",
      en: "Fleet",
    }),
    createYourFleet: t({
      fr: "Créez votre flotte",
      en: "Create your fleet",
    }),
    createYourFleetSubtitle: t({
      fr: "Commencez par définir le profil de votre future flotte",
      en: "Start by defining the profile of your future fleet",
    }),
    fleetNameLabel: t({
      fr: "Nom de la flotte",
      en: "Fleet name",
    }),
    fleetNamePlaceholder: t({
      fr: "Renseignez un nom",
      en: "Enter a name",
    }),
    colorLabel: t({
      fr: "Couleur",
      en: "Color",
    }),
    chooseColor: t({
      fr: "Choisir la couleur",
      en: "Choose color",
    }),
    descriptionLabel: t({
      fr: "Description",
      en: "Description",
    }),
    descriptionInputPlaceholder: t({
      fr: "Inscrivez une description sur le sujet de la flotte",
      en: "Enter a description of the fleet",
    }),
    cancel: t({
      fr: "Annuler",
      en: "Cancel",
    }),
    submit: t({
      fr: "Créer la flotte",
      en: "Create a fleet",
    }),
    companies: t({
      fr: "entreprises",
      en: "companies",
    }),
    titleRequired: t({
      fr: "Le nom de la flotte est requis",
      en: "Fleet name is required",
    }),
  },
} satisfies Dictionary;

export default fleetsContent;
