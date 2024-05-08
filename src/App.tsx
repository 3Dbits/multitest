import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  ButtonGroup,
  Container,
  Heading,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { OptionBase, Select } from "chakra-react-select";
import ControlledSelect from "./ControlledSelect";

interface SignupReason extends OptionBase {
  label: string;
  value: string;
}

interface FormValues {
  firstName: string;
  signupReasonsPart1: SignupReason[];
  signupReasonsPart2: SignupReason[];
}

interface FormValuesDTO {
  firstName: string;
  signupReasons: SignupReason[];
}
const deafultInputs: SignupReason[] = [
  { label: "Increasing Retention", value: "retention" },
  { label: "Increasing User Conversion", value: "conversion" },
];

const reasonOptions1: SignupReason[] = [
  { label: "Increasing Retention", value: "retention" },
  { label: "Increasing User Conversion", value: "conversion" },
  { label: "Improving Feature Adoption", value: "adoption" },
];

const reasonOptions2: SignupReason[] = [
  { label: "Identifying User Behavior", value: "behavior" },
  { label: "A/B Testing", value: "ab" },
];

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  signupReasonsPart1: yup.array().notRequired(),
  signupReasonsPart2: yup.array().notRequired(),
});

const defaultValues: FormValues = {
  firstName: "",
  signupReasonsPart1: deafultInputs,
  signupReasonsPart2: [],
};

function App() {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const formValues: FormValuesDTO = {
      firstName: values.firstName,
      signupReasons: values.signupReasonsPart1.concat(
        values.signupReasonsPart2
      ),
    };
    console.log(formValues);
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <Container my={8} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h1" mb={8} size="lg">
        Sign Up Form
      </Heading>

      <Stack spacing={6}>
        <FormControl id="firstName" isInvalid={!!errors.firstName}>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="First name"
            type="text"
            {...register("firstName")}
          />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        {/*  <ControlledSelect<FormValues, SignupReason, true>
          isMulti
          name="signupReasonsPart1"
          control={control}
          label="Reasons for Sign Up 1"
          placeholder="Select some reasons"
          options={reasonOptions1}
          defaultValue={deafultInputs}
        /> */}

        <ControlledSelect<FormValues, SignupReason, true>
          isMulti
          name="signupReasonsPart2"
          control={control}
          label="Reasons for Sign Up 2"
          placeholder="Select some reasons"
          options={reasonOptions2}
        />

        <Controller
          name="signupReasonsPart1"
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              placeholder="Select some reasons"
              options={reasonOptions1}
              {...field}
            />
          )}
        />

        <ButtonGroup>
          <Button
            type="button"
            isLoading={isSubmitting}
            onClick={handleReset}
            w="full"
          >
            Reset
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="blue"
            w="full"
          >
            Submit
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  );
}

export default App;
