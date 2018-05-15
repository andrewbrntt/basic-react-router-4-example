function createSeries (context, completeRecord) {
  return function (dispatch) {
    const saveRecord = new Promise((resolve) => {
      resolve(dispatch(requestAddNewSeries(completeRecord)))
    })

    return saveRecord.then((record) => {
      if (record.error) {
        Alert.error(record.error,
          { effect: 'slide' }
        )
      } else if (parseInt(record.response.newSeriesTitle)) {
        context.router.replace(`series/${record.response.newSeriesTitle}`)
      } else {
        return record
      }
    })
  }
}
