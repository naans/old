import React from 'react'
import {categories, meals} from '../../helpers/store'
import crud from '../meta/crud'
import Picture from '../parts/Picture'

const texts = {
    menu: {
        all: 'Liste des repas',
        add: 'Ajouter un repas'
    },
    btns: {
        add: 'Ajouter',
        edit: 'Modifier',
        remove: 'Supprimer'
    },
    titles: {
        all: 'Liste des repas',
        add: 'Ajouter un nouveaux repas',
        edit: 'Modifier un repas'
    },
    msgs: {
        added:       data => `Le repas ${data.name} a ete bien ajoute`,
        addError:    data => `Erreur lors de l'ajout du repas ${data.name}`,
        edited:      data => `Le repas ${data.name} a ete bien modifie`,
        editError:   data => `Erreur lors de la modification du repas ${data.name}`,
        removed:     data => `Le repas ${data.name} a ete bien supprime`,
        removing:    data => `Etes-vous sure de vouloir supprimer le repas ${data.name} ?`,
        removeError: data => `Erreur lors de la suppression du repas ${data.name}`,
        yesReomve: 'Oui, Supprimer !',
        noCancel:  'Non, Annuler'
    }
}

    // picture: Picture

const fields = [
    {
        name: 'category',
        displayName: 'Categorie',
        inTable: true,
        inForm: true,
        type: 'select',
        store: categories,
        options: [],
        optionLabel: 'name'
    },
    {
        name: 'picture',
        displayName: 'Photo',
        inTable: true,
        custom: true,
        display: id => <Picture id={id} width="160" />
    },
    {
        name: 'name',
        displayName: 'Nom',
        placeholder: 'Le nom du repas',
        inTable: true,
        inForm: true,
        type: 'text',
        rules: ['required']
    },
    {
        name: 'price',
        displayName: 'Prix',
        placeholder: 'Le prix du repas',
        inTable: true,
        inForm: true,
        type: 'number',
        rules: ['required']
    },
    {
        name: 'picture',
        displayName: 'Photo',
        placeholder: 'La photo du repas',
        inForm: true,
        type: 'picture',
        category: 'meal',
        rules: ['required']
    },
    {
        name: 'description',
        displayName: 'Description',
        placeholder: 'La description du repas',
        inTable: true,
        inForm: true,
        type: 'textarea',
        rules: []
    },
    { name: 'hidden', value: false }
]

export default crud(meals, fields, texts)
