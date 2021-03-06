
import { Button } from "@chakra-ui/core";
import React from "react";
import {
  TableDataDocument,
  TableDataQuery,
  useInsertHeaderMutation,
  useInsertRowMutation,
} from "../../generated/graphql";

interface CustomBtnProps {
  // refetch: () => Promise<ApolloQueryResult<TableDataQuery>>;
  data: TableDataQuery;
}

const CustomBtn: React.FC<CustomBtnProps> = ({ data }) => {
  const [
    insert_headers_one,
    { loading: insertHeaderFetch },
  ] = useInsertHeaderMutation();
  const [insert_rows_one, { loading: insertRowFetch }] = useInsertRowMutation();
  const addRowOnClick = async () => {
    await insert_rows_one({
      variables: { row_id: data.rows.length + 1 },
      refetchQueries: [{ query: TableDataDocument }],
    });
  };

  const addColumnOnClick = async () => {
    await insert_headers_one({
      variables: { header_id: data.headers.length + 1, header_name: "New" },
      refetchQueries: [{ query: TableDataDocument }],
    });
  };
  return (
    <>
      <Button
        width={"50%"}
        type="submit"
        isLoading={insertRowFetch}
        onClick={async () => addRowOnClick()}
        variantColor="teal"
        marginX={2}
      >
        Add row
      </Button>
      <Button
        marginX={2}
        width={"50%"}
        type="submit"
        isLoading={insertHeaderFetch}
        onClick={async () => addColumnOnClick()}
        variantColor="teal"
      >
        Add column
      </Button>
    </>
  );
};

export default CustomBtn;
