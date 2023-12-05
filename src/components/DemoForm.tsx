import { JsonForms } from '@jsonforms/react';
import { JsonSchema, Layout } from "@jsonforms/core";
import { cells, renderers } from "@/components/renderers";
import { useForm } from "@/components/useForm";
import { Spin } from "@/components/Spin";

const schema: JsonSchema = {
  type: 'object',
  properties: {
    login: {
      type: 'string',
      minLength: 1,
    },
    password: {
      type: 'string',
      minLength: 1,
    },
    address: {
      type: 'object',
      properties: {
        country: {
          type: 'string',
          oneOf: [
            {
              const: 'US',
              title: 'United States'
            },
            {
              const: 'UK',
              title: 'United Kingdom'
            },
            {
              const: 'AM',
              title: 'Armenia'
            }
          ]
        },
        city: {
          type: 'string',
          minLength: 1,
        }
      }
    }
  },
  required: ['login', 'password'],
};

const uischema: Layout = {
  type: 'Layout',
  options: {
    className: 'flex'
  },
  elements: [
    {
      type: 'InputControl',
      scope: '#/properties/login',
      label: 'Login',
      options: {
        type: 'text'
      }
    },
    {
      type: 'InputControl',
      scope: '#/properties/password',
      label: 'Password',
      options: {
        type: 'password'
      }
    },
    {
      type: 'Layout',
      elements: [
        {
          type: 'SelectControl',
          scope: '#/properties/address/properties/country',
          label: 'Country',
          options: {}
        },
        {
          type: 'InputControl',
          scope: '#/properties/address/properties/city',
          label: 'City',
          options: {}
        }
      ]
    }
  ]
};

const initialData = {};

export const DemoForm = () => {
  const {
    isTouched,
    isSubmitting,
    data,
    errors,
    handleChange,
    handleSubmit
  } = useForm({
    initialData
  });

  async function action() {
    console.log('action');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('action completed');

        resolve(undefined);
      }, 2000);
    });
  }

  return (
    <form onSubmit={handleSubmit(action)}>
      <JsonForms
        config={{
          touched: isTouched
        }}
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={cells}
        onChange={handleChange}
      />
      <div className="mt-4">
        <button type="submit" className="border bg-amber-50 px-10 py-2">
          <span className="inline-flex gap-4 items-center">
            Submit
            {isSubmitting && (
              <Spin/>
            )}
          </span>
        </button>
      </div>
    </form>
  );
};
