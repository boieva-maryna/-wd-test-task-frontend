import { FC, ChangeEvent, useMemo, MouseEvent } from "react";
import {
  InputWrapper,
  Stack,
  Button,
  Image,
  CloseButton,
  Box,
} from "@mantine/core";

interface Props {
  value?: string | File;
  onChange: (value?: File) => void;
  label?: string;
}

const ImageUpload: FC<Props> = ({ onChange, value, label }) => {
  const src = useMemo(
    () =>
      !value || typeof value === "string" ? value : URL.createObjectURL(value),
    [value]
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files ? e.target.files[0] : undefined);
  };

  const onDelete = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange(undefined);
  };

  return (
    <InputWrapper label={label}>
      <Stack>
        <label htmlFor="upload-avatar">
          <input
            onChange={onInputChange}
            style={{ visibility: "hidden" }}
            accept="image/*"
            id="upload-avatar"
            type="file"
            value=""
          />
          <Stack align="start">
            <Box sx={{ position: "relative" }}>
              <Image
                src={src}
                withPlaceholder
                height={100}
                width="auto"
                sx={{ minWidth: 100 }}
              />
              {src && (
                <CloseButton
                  onClick={onDelete}
                  sx={{ position: "absolute", right: -10, top: -10 }}
                />
              )}
            </Box>
            <Button variant="subtle" component="span">
              Upload File (PNG, JPG)
            </Button>
          </Stack>
        </label>
      </Stack>
    </InputWrapper>
  );
};

export default ImageUpload;
