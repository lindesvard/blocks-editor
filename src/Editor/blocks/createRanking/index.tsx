import React, { memo, useEffect, useState } from "react";
import { Star } from "phosphor-react";
import { BlockOptions, BlockOptionsIn, BlockProps } from "../../types";
import Block from "../../ui/Block";
import { Column, Row } from "Editor/ui/Structure";
import { ButtonTransparent } from "Editor/ui/ButtonTransparent";
import { Input, Select, Textarea } from "Editor/ui/Input";
import Text from "Editor/ui/Text";

const ID = "playerCard";
type Field = React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> & {
  id: string;
  options?: () => Promise<Array<{ key: string; value: string }>>;
};

type RankingBlockOptionsIn = BlockOptionsIn & {
  fields?: Array<Field>;
};

type Model = {
  star: number | null;
  fields?: {
    [key: string]: string;
  };
};

function SelectWithOptions({ options: fetchOptions, onChange, value }: Field) {
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<{ key: string; value: string }>>(
    []
  );
  useEffect(() => {
    if (fetchOptions) {
      setLoading(true);
      fetchOptions().then((response) => {
        setOptions(response);
        setLoading(false);
      });
    }
  }, [fetchOptions]);
  return (
    <Select onChange={onChange} value={value}>
      <option value="">{loading ? "Loading..." : "Select something..."}</option>
      {options.map(({ key, value }) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </Select>
  );
}

function Rating({
  value,
  onChange,
}: {
  value: number;
  onChange: (rate: number) => void;
}) {
  const [hover, setHover] = useState<number>(-1);
  return (
    <>
      {[1, 2, 3, 4, 5].map((rate) => (
        <ButtonTransparent
          key={rate}
          onMouseEnter={() => setHover(rate)}
          onMouseLeave={() => setHover(-1)}
          onClick={() => onChange(rate)}
        >
          <Star
            size={50}
            color={
              hover !== -1
                ? hover >= rate
                  ? "#ffbb00"
                  : "#999"
                : value >= rate
                ? "#ffbb00"
                : "#999"
            }
            weight="duotone"
          />
        </ButtonTransparent>
      ))}
    </>
  );
}

export function createRanking(
  options?: RankingBlockOptionsIn
): BlockOptions<Model> {
  const fields = options?.fields || [];
  function BlockComponent({ onUpdate, data, contentId }: BlockProps<Model>) {
    useEffect(() => {
      if (data === null) {
        onUpdate(contentId, { star: null, fields: {} });
      }
    }, [onUpdate, data, contentId]);

    if (data === null) {
      return <Block title="Ranking" padding={20} />;
    }

    const handleFieldChange = (id: string) => (
      event: React.ChangeEvent<
        HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
      >
    ) => {
      const { value } = event.target;
      onUpdate(contentId, (prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [id]: value,
        },
      }));
    };

    const currentRate = data.star || 0;

    return (
      <Block title="Ranking" padding={20}>
        <Row
          alignItems="center"
          justifyContent="center"
          style={{
            border: "2px dashed #c4c4c4",
            padding: 20,
            margin: -10,
            marginBottom: 20,
            borderRadius: 10,
            height: 100,
          }}
        >
          <Rating
            value={currentRate}
            onChange={(rate) =>
              onUpdate(contentId, (prev) => ({
                ...prev,
                star: rate,
              }))
            }
          />
        </Row>
        <Row m={-10}>
          {fields.map(({ id, ...field }) => {
            const value = data?.fields ? data?.fields[id] || "" : "";
            return (
              <Column key={id} flex={1} m={10}>
                <Text size="small" color="light" mb={5}>
                  {field.placeholder}
                </Text>
                {field.type === "textarea" && (
                  <Textarea
                    value={value}
                    onChange={handleFieldChange(id)}
                    placeholder="Hey, add some text!"
                    border
                  />
                )}
                {field.type === "select" && (
                  <SelectWithOptions
                    {...{ id, ...field }}
                    onChange={handleFieldChange(id)}
                    value={value}
                  />
                )}
                {field.type === "text" && (
                  <Input
                    {...field}
                    onChange={handleFieldChange(id)}
                    value={value}
                  />
                )}
              </Column>
            );
          })}
        </Row>
      </Block>
    );
  }

  return {
    id: ID,
    name: "Ranking",
    button: {
      label: options?.button?.label ?? "Add ranking",
      Icon: options?.button?.Icon ?? Star,
    },
    Block: memo(BlockComponent),
    initialData: { star: 0 },
  };
}
