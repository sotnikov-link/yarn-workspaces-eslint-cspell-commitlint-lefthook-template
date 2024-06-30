require('./props-init.cjs');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
const props = {
  files: ['**/*.tsx'],

  plugins: {
    regex: require('eslint-plugin-regex'),
  },

  /**
   * @type {import('eslint').Linter.RulesRecord}
   */
  rules: {
    'regex/invalid-react-props-type': [
      'warn',

      [
        {
          message: 'Use interface for React Component Props',

          // // Bad example
          // type InputProps = ComponentPropsWithRef<'input'> & {
          //   type: number; // no error and input gets invalid property :(
          // };

          // // Good example
          // interface InputProps extends ComponentPropsWithRef<'input'> {
          //   type: number; // typescript error :)
          // }

          regex: `^(export )?type( \\w+Props) =`,
          // replacement: {
          //   function: 'return ($[1] || "") + "interface" + $[2]',
          // },
        },
      ],
    ],
  },
};

module.exports = props;
