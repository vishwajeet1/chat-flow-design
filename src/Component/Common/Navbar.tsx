import { FunctionComponent } from "react";
import { Button } from "@mui/material";

interface Props {
  onClick: () => void;
}

const Navbar: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <div className="sticky top-0 left-0 w-full border-b border-gray-300 p-2 bg-white">
      <div className="flex justify-end">
        <Button variant="outlined">Save Changes</Button>
      </div>
    </div>
  );
};
export default Navbar;
