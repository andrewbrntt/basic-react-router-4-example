export function updateIssueQuantity(quantityRecord, currentIssue) {
  return function (dispatch) {
    const saveRecord = new Promise((resolve) => {
      resolve(dispatch(requestUpdateIssueQuantity(quantityRecord)))
    })

    return saveRecord.then((response) => {
      dispatch(requestInventory(true))
      if (response.error) {
        Alert.error(response.error,
          {effect: 'slide'}
        )
      } else {
        Alert.success(
          `${currentIssue.seriesTitle} issue: ${currentIssue.issueNumber} was successfully updated`,
          {effect: 'jelly'}
        )
      }
    })
  }
}

export function updateIssueSelectedList(selectedList) {
  return function (dispatch) {
    let removeRecord = new Promise((resolve) => {
      resolve(dispatch(requestUpdateSelectedList(selectedList)))
    })

    return removeRecord.then((response) => {
      dispatch(updateDeleteButton(response.selectedIssueList))
      dispatch(updateEditButton(response.selectedIssueList))
    })
      .catch(error => {
        console.error(error)
      })
  }
}

export function updateReadStatus(issues) {
  return function (dispatch) {
    const saveRecord = new Promise((resolve) => {
      resolve(dispatch(requestUpdateReadStatus(issues)))
    })

    return saveRecord.then((response) => {
      dispatch(requestUpdateSelectedList([]))
      dispatch(updateDeleteButton([]))
      dispatch(updateEditButton([]))
      dispatch(requestInventory(true))
      if (response.error) {
        Alert.error(response.error,
          {effect: 'slide'}
        )
      }
    })
  }
}

export function updateIssue (context, completeRecord) {
  return function (dispatch) {
    const saveRecord = new Promise((resolve) => {
      resolve(dispatch(requestUpdateIssue(completeRecord)))
    })

    return saveRecord.then((record) => {
      if (record.error) {
        Alert.error(record.error,
          {effect: 'slide'}
        )
      } else {
        context.router.replace('/inventory/personal')
        return record
      }
    })
  }
}