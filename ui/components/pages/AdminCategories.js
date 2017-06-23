import {categories} from '../../helpers/store'
import crud from '../meta/crud'

const texts = {
    menu: {
        all: 'Liste des categories',
        add: 'Ajouter une categorie'
    },
    btns: {
        add: 'Ajouter',
        edit: 'Modifier',
        remove: 'Supprimer'
    },
    titles: {
        all: 'Liste des categories',
        add: 'Ajouter une nouvelle categorie',
        edit: 'Modifier une categorie'
    },
    msgs: {
        added:       data => `La categorie ${data.name} a ete bien ajoutee`,
        addError:    data => `Erreur lors de l'ajout de la categorie ${data.name}`,
        edited:      data => `La categorie ${data.name} a ete bien modifiee`,
        editError:   data => `Erreur lors de la modification de la categorie ${data.name}`,
        removed:     data => `La categorie ${data.name} a ete bien supprimee`,
        removing:    data => `Etes-vous sure de vouloir supprimer la categorie ${data.name} ?`,
        removeError: data => `Erreur lors de la suppression de la categorie ${data.name}`,
        yesReomve: 'Oui, Supprimer !',
        noCancel:  'Non, Annuler'
    }
}

const fields = [
    {
        name: 'parent',
        displayName: 'Sous categorie de',
        inForm: true,
        type: 'select',
        store: categories,
        options: [],
        optionLabel: 'name'
    },
    {
        name: 'name',
        displayName: 'Nom',
        placeholder: 'Le nom de la categorie',
        inTable: true,
        inForm: true,
        type: 'text',
        rules: ['required']
    },
    {
        name: 'description',
        displayName: 'Description',
        placeholder: 'La description de la categorie',
        inTable: true,
        inForm: true,
        type: 'textarea',
        rules: []
    },
    { name: 'hidden', value: false },
    { name: 'childs', value: [] },
    { name: 'meals', value: [] }
]

export default crud(categories, fields, texts)
