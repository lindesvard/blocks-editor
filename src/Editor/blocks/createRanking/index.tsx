import React, { memo, useEffect, useState } from "react";
import { Star } from "phosphor-react";
import { BlockOptions, BlockOptionsIn, BlockProps } from "../../types";
import Block from "../../ui/Block";
import { Column, Row } from "Editor/ui/Structure";
import { ButtonTransparent } from "Editor/ui/ButtonTransparent";
import { Input } from "Editor/ui/Input";

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

function Select({ options: fetchOptions, onChange, value }: Field) {
  const [options, setOptions] = useState<Array<{ key: string; value: string }>>(
    []
  );
  useEffect(() => {
    if (fetchOptions) {
      fetchOptions().then(setOptions);
    }
  }, [fetchOptions]);
  return (
    <select onChange={onChange} value={value}>
      <option value="">Select something...</option>
      {options.map(({ key, value }) => (
        <option key={key} value={key} selected={value === key}>
          {value}
        </option>
      ))}
    </select>
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

    const handleFieldChange = (id: string) => (event: any) => {
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
          {[1, 2, 3, 4, 5].map((rate) => (
            <ButtonTransparent
              key={rate}
              onClick={() =>
                onUpdate(contentId, (prev) => ({
                  ...prev,
                  star: rate,
                }))
              }
            >
              <Star
                size={50}
                color={currentRate >= rate ? "#ffbb00" : "#999"}
                weight="duotone"
              />
            </ButtonTransparent>
          ))}
        </Row>
        <Row m={-10}>
          {fields.map(({ id, ...field }) => (
            <Column key={id} flex={1} m={10}>
              {field.placeholder}
              {field.type === "select" ? (
                <Select
                  {...{ id, ...field }}
                  onChange={handleFieldChange(id)}
                  value={data?.fields ? data?.fields[id] : ""}
                />
              ) : (
                <Input
                  {...field}
                  onChange={handleFieldChange(id)}
                  value={data?.fields ? data?.fields[id] : ""}
                />
              )}
            </Column>
          ))}
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
