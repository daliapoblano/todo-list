import styled from "styled-components";

const StyledInput = styled.input`
  padding: 6px;
  `;
const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  `;
function TextInputWithLabel({
    elementId,
    label,
    onChange,
    ref,
    value,
}) {
    return (
        <>
        <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
        <StyledInput
            type="text"
            id={elementId}
            ref={ref}
            value={value}
            onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel
