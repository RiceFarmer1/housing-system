interface ConditionValidatorProps {
	checkForNullable: <T extends string, K>(errorMsg: T, conditions: K) => K;
}

export namespace Conditioner {
	export class ConditionValidator implements ConditionValidatorProps {
		constructor() {}

		public checkForNullable: <T extends string, K>(errorMsg: T, condition: K) => K = (errorMsg, condition) => {
			if (typeIs(condition, "nil")) {
				throw errorMsg;
			}
			return condition;
		};
	}
}
