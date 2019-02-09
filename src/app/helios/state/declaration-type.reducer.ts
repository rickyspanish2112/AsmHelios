export function reducer(state, action) {

 switch (action.type) {
      case 'TOGGLE_DISPLAY_DECLARATION_TYPES':
      console.log('existing state ' + JSON.stringify(state));
      console.log('payload ' + action.payload);
      return {
        ...state,
        showDeclarationTypes: action.payload
      };

      default:
      return state;
 }
}
