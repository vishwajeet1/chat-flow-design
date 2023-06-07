import { FunctionComponent } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { nodeSettingTitleConstant } from "Component/ChatFlow/constant";
import { NodeTypeEnum } from "Component/ChatFlow/chatFlowInterface";

interface Props {
  onClick: () => void;
  title: string;
}

const NodeSettingHeader: FunctionComponent<Props> = ({ onClick, title }) => {
  return (
    <div
      className="flex justify-start gap-4 border-b border-gray-300 text-gray-500 font-bold py-2 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <ArrowBackIcon />
      </div>
      <div className="self-center">{title}</div>
    </div>
  );
};
export default NodeSettingHeader;
