import { FunctionComponent } from "react";
import { Button } from "@mui/material";

interface Props {
  onSave: () => void;
}

const Navbar: FunctionComponent<Props> = ({ onSave }) => {
  return (
    <div className="fixed top-0 left-0 w-full border-b border-gray-300 p-2 bg-white z-20">
      <div className="flex justify-end gap-4">
        <Button variant="outlined" onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
