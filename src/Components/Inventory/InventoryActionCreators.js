import * as actionTypes from './ActionConstants'
import { CALL_API } from '../Middleware/api.js'

export function requestInventory(isPersonal) {
  const selectedInventory = isPersonal ? 'personal' : 'selling'
  return {
    [CALL_API]: {
      endpoint: `read/${selectedInventory}inventory`,
      authenticated: true,
      method: 'GET',
      types: [
        actionTypes.REQUEST_INVENTORY,
        actionTypes.REQUEST_INVENTORY_SUCCESS,
        actionTypes.REQUEST_INVENTORY_FAILURE
      ],
      relatedData: {isPersonal}
    }
  }
}

export function addIssueToInventory(issueInfo) {
  return {
    [CALL_API]: {
      endpoint: 'update/addissuetoinventory',
      authenticated: true,
      method: 'POST',
      body: issueInfo,
      types: [
        actionTypes.ADD_TO_INVENTORY,
        actionTypes.ADD_TO_INVENTORY_SUCCESS,
        actionTypes.ADD_TO_INVENTORY_FAILURE
      ]
    }
  }
}

export function requestRemoveInventoryIssue (issuesToRemove, isPersonal) {
  return {
    [CALL_API]: {
      endpoint: 'delete/removeissuefrominventory',
      authenticated: true,
      method: 'POST',
      body: { issuesToRemove, isPersonal },
      types: [
        actionTypes.REQUEST_INVENTORY_ISSUE_REMOVE,
        actionTypes.REQUEST_INVENTORY_ISSUE_REMOVE_SUCCESS,
        actionTypes.REQUEST_INVENTORY_ISSUE_REMOVE_FAILURE
      ]
    }
  }
}
