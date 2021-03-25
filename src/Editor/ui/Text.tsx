import styled from "styled-components";

const Text = styled.p<{
  size?: "default" | "small" | "medium" | "large";
  weight?: number;
}>`
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return 12;
      case "default":
      default:
        return 16;
      case "medium":
        return 20;
      case "large":
        return 24;
    }
  }}px;
  font-weight: ${(props) => props.weight || 400};
`;

export default Text;
