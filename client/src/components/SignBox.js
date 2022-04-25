import {
  React,
  motion,
  styled,
  useState,
  useFetch,
  useInput,
  useEffect,
  useNavigate,
  useErrorBang,
  Button,
  Input,
  Div,
  validate,
  MAX_ID_LENGTH,
  MAX_PASSWORD_LENGTH,
  removeWhitespace,
  useFocus,
} from '../common';

const Container = styled(Div)`
  width: 40%;
  flex-direction: column;
  justify-content: space-between;
  height: 14rem;
`;

const InnerContainer = styled(Div)`
  flex-direction: column;
  justify-content: space-between;
  margin: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2.4rem;
`;

const Label = styled.label``;

const ToLogIn = styled(motion.span)`
  font-size: 0.9rem;
  text-decoration: underline;
  margin-top: 0.5rem;
  opacity: 0.8;
`;

// ---------- Animation ----------
const Container__Animate = {
  hidden: {
    y: '-50vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 30,
      stiffness: 400,
    },
  },
  exit: {
    y: '50vh',
    opacity: 0,
  },
};
// -------------------------------

const memoId = {
    value: '',
  },
  memoEmail = {
    value: '',
  };

function SignBox() {
  const [id, inputId] = useInput({
      initialValue: memoId,
      middleware: removeWhitespace,
    }),
    [password, inputPassword] = useInput({ middleware: removeWhitespace }),
    [passwordRe, inputPasswordRe] = useInput({ middleware: removeWhitespace }),
    [email, inputEmail] = useInput({
      initialValue: memoEmail,
      middleware: removeWhitespace,
    });

  const [focusIdRef, focusId] = useFocus({ start: false });
  const [focusPasswordRef, focusPassword] = useFocus({ start: false });

  useEffect(() => {
    if (memoId.value.length > 0) {
      focusPassword();
    } else {
      focusId();
    }
  }, []);

  const errorBang = useErrorBang();

  const [submit, setSubmit] = useState(false);
  const onSubmit = () => {
    if (
      id.length === 0 || //
      password.length === 0 ||
      passwordRe.length === 0 ||
      email.length === 0
    ) {
      return;
    }
    if (password !== passwordRe) {
      errorBang(`Validating`, `Password(re) is different from the password`);
    }
    try {
      validate({ key: 'id', value: id });
      validate({ key: 'password', value: password });
      validate({ key: 'email', value: email });
      setSubmit(true);
    } catch ({ message = '' }) {
      errorBang('Validating', message);
    }
    setSubmit(true);
  };

  const { data } = useFetch({
    key: 'sign',
    args: { data: { id, password } },
    condition: submit,
  });

  const navigate = useNavigate();

  if (data) {
    setSubmit(false);
    navigate('/');
  }

  const toLogin = () => {
    navigate('/');
  };

  return (
    <Container
      variants={Container__Animate}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Title>Sign Up</Title>
      <InnerContainer>
        <Label>
          {/* ID */}
          <Input
            placeholder="Your ID Here"
            ref={focusIdRef}
            onEnter={onSubmit}
            maxLength={MAX_ID_LENGTH}
            {...inputId}
            required
            tabIndex="1"
          />
        </Label>
        <Label>
          {/* pw */}
          <Input
            placeholder="Password"
            ref={focusPasswordRef}
            type="password"
            onEnter={onSubmit}
            maxLength={MAX_PASSWORD_LENGTH}
            {...inputPassword}
            required
            tabIndex="2"
          />
        </Label>
        <Label>
          {/* pw(re) */}
          <Input
            placeholder="Confirm Password"
            type="password"
            onEnter={onSubmit}
            maxLength={MAX_PASSWORD_LENGTH}
            {...inputPasswordRe}
            required
            tabIndex="3"
          />
        </Label>
        <Label>
          {/* email */}
          <Input
            placeholder="E-mail Address"
            type="email"
            onEnter={onSubmit}
            {...inputEmail}
            required
            tabIndex="4"
          />
        </Label>
      </InnerContainer>
      <Button onClick={onSubmit}>Submit</Button>
      <ToLogIn
        onClick={toLogin}
        onKeyDown={(e) => {
          // Tab Looping
          e.preventDefault();
          if (e.key === 'Tab') {
            focusId();
          } else if (e.key === 'Enter') {
            toLogin();
          }
        }}
        whileHover={{
          color: 'rgba(200, 225, 200, 0.7)',
          scale: 1.05,
        }}
        tabIndex="5"
      >
        Log in
      </ToLogIn>
    </Container>
  );
}

export default SignBox;
