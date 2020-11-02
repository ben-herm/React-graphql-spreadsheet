export const convertDataToTableValues = (data): Array<[[]]> => {
  if (data) {
    let headers = [];
    let newValues: Array<any> = [];
    let value;
    data.headers.forEach((header) => {
      headers.push({
        header_id: header.header_id,
        value: header.header_name,
        type: "header",
      });
    });

    for (let i = 0; i < data.rows.length; i++) {
      newValues[i] = [];
    }
    newValues.forEach((val, index) => {
      for (let j = 0; j < data.headers.length; j++) {
        let found = data.values.find(
          (value) =>
            value.header_id == data.headers[j].header_id &&
            value.row_id == index + 1
        );
        if (found) {
          value = found.value;
        } else {
          value = " ";
        }
        val.push({
          row_id: index + 1,
          header_id: data.headers[j].header_id,
          value_id: found ? found.value_id : null,
          type: "value",
          value,
        });
      }
    });
    return [headers, ...newValues];
  }
};