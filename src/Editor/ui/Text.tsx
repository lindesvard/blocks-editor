import styled from "styled-components";

const Text = styled.p<{
  size?: "default" | "small" | "medium" | "large";
  color?: "default" | "light";
  mb?: number;
  weight?: number;
}>`
  margin-bottom: ${(props) => props.mb || 0}px;
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
  color: ${(props) => {
    switch (props.color) {
      case "light":
        return "#545454";
      case "default":
      default:
        return "#222";
    }
  }};
  font-weight: ${(props) => props.weight || 400};
`;

export default Text;
