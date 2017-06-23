import React from 'react'
import {pictures, meals} from '../../helpers/store'
import crud from '../meta/crud'

const read = file => new Promise((resolve, reject) => {
    const reader = new FileReader
    reader.onload = () => resolve(reader.result.substring(1 + reader.result.indexOf(',')))
    reader.onerror = err => reject(err)
    reader.readAsDataURL(file)
})

const texts = {
    menu: {
        all: 'Liste des photo',
        add: 'Ajouter une photo'
    },
    btns: {
        add: 'Ajouter',
        edit: 'Modifier',
        remove: 'Supprimer'
    },
    titles: {
        all: 'Liste des photos',
        add: 'Ajouter une nouvelle photo',
        edit: 'Modifier une photo'
    },
    msgs: {
        added:       data => `La photo ${data.name} a ete bien ajoute`,
        addError:    data => `Erreur lors de l'ajout de la photo ${data.name}`,
        edited:      data => `La photo ${data.name} a ete bien modifie`,
        editError:   data => `Erreur lors de la modification de la photo ${data.name}`,
        removed:     data => `La photo ${data.name} a ete bien supprime`,
        removing:    data => `Etes-vous sure de vouloir supprimer la photo ${data.name} ?`,
        removeError: data => `Erreur lors de la suppression de la photo ${data.name}`,
        yesReomve: 'Oui, Supprimer !',
        noCancel:  'Non, Annuler'
    }
}

    // picture: Picture

const fields = [
    {
        name: 'url',
        displayName: 'Photo',
        inTable: true,
        custom: true,
        display: url => <a href={url}><img src={url} height="150"/></a>
    },
    {
        name: 'picture',
        displayName: 'Photo',
        inForm: true,
        type: 'file',
        rules: ['required'],
        aliasOf: 'id',
        custom: true,
        handle: input => read(input.files[0])
    },
    {
        name: 'type',
        displayName: 'Type',
        inForm: true,
        type: 'select',
        optionLabel: 'name',
        default: 'meal',
        options: [
            {id: 'meal', name: 'Repas'},
            {id: 'category', name: 'Categorie'},
            {id: 'album', name: 'Album'}
        ]
    },
    {
        name: 'description',
        displayName: 'Description',
        placeholder: 'La description du repas',
        inTable: true,
        inForm: true,
        type: 'textarea',
        rules: []
    }
]

export default crud(pictures, fields, texts)
