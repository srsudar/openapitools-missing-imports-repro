module.exports = () => {
  return {
    id: 'remove-json-schema-properties',
    decorators: {
      oas3: {
        'remove-schema-and-id': () => {
          return {
            Schema: {
              leave(node) {
                // Our pure JSONSChema has $schema and $id properties. These are
                // fine in JSONSchema, but they should not be included in output
                // openapi component specs, b/c they affect behavior of things
                // like AJV.
                //
                // Instead, remove them.
                delete node['$schema'];
                delete node['$id'];
              },
            },
          };
        },
      },
    },
  };
};
