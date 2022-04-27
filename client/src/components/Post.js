import {
  React,
  motion,
  styled,
  Div,
  Button,
  useSelector,
  useFocus,
} from "../common";

const Container = styled(Div)`
  flex-direction: column;
  padding: 1rem 0;
  border-radius: 4px;
`;

const ContentContainer = styled(Div)`
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem;
  padding-top: 0rem;
`;

const Block = styled(Div)`
  display: grid;
  grid-template-columns: 3fr 15fr 3fr 2fr;
  grid-gap: 18px;

  word-break: break-all;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Author = styled(Div)`
  opacity: 0.7;
  font-size: clamp(0.8rem, 1vw, 1.5rem);
  justify-content: flex-start;
`;

const AuthorInContent = styled(Author)`
  width: 30%;
  font-size: clamp(0.7rem, 1vw, 1.2rem);
`;

const Title = styled(Div)`
  font-size: clamp(1.4rem, 1vw, 3rem);
  justify-content: flex-start;
  padding-left: 1rem;
`;

const TitleInContent = styled(Title)`
  font-size: 1.2rem;
  margin-left: 0.4rem;
`;

const CreatedAt = styled(Div)`
  font-size: clamp(0.4rem, 0.5vw, 0.8rem);
  justify-content: flex-end;
`;

const CreatedAtInContent = styled(CreatedAt)`
  font-size: clamp(0.4rem, 0.5vw, 2rem);
  justify-content: flex-end;
`;

const Views = styled(Div)`
  font-size: clamp(0.4rem, 2.4vw, 0.9rem);
  justify-content: flex-end;
`;

const ViewsInContent = styled(Views)`
  font-size: clamp(0.4rem, 0.5vw, 2rem);
  justify-content: flex-start;
`;

const Content = styled(Div)`
  overflow-y: scroll;
  justify-content: flex-start;
  align-items: flex-start;
  word-wrap: break-word;
  padding: 4rem;
`;

const TotalDonation = styled(motion.span)`
  font-size: clamp(0.2rem, 0.2vw, 1rem);
  justify-content: flex-end;
  margin-right: 1rem;
`;

const DonateButton = styled(Button)``;

/* -----------Write Mode----------- */

const InputTitle = styled(motion.input)`
  background-color: rgba(0, 0, 0, 0);
  outline: none !important;
  border: 1px solid black;
  border: none;
  color: whitesmoke;
  width: 100%;
  height: 100%;
  padding-right: 1rem;
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  &::placeholder {
    opacity: 0.15;
  }
`;

const TextArea = styled(motion.textarea)`
  background-color: rgba(0, 0, 0, 0);
  outline: none !important;
  border: 1px solid black;
  border-top: 1px solid #222222;
  padding: 2.5rem 0.5rem;
  resize: none;
  color: whitesmoke;
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  width: 100% !important;
  height: 100% !important;
  &::placeholder {
    opacity: 0.15;
  }
`;
/* -------------------------------- */

const variants = {
  opened: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
    display: "none",
  },
};

function Post({
  myKey = -1,
  selectedKey = -1,
  selectThisToggle = () => {},
  data: {
    new_id,
    article_id,
    article_title,
    article_views,
    article_author,
    article_content,
    article_created_at,
    article_updated_at,
  } = {},
}) {
  const isViewMode = myKey > 0;
  const isWriteMode = myKey === -1;

  const isSelected = myKey === selectedKey;
  const isNotSelected = selectedKey > 0 && !isSelected;

  const { id } = useSelector((state) => state.user);

  const [FocusTitleRef] = useFocus();

  return (
    <Container
      onClick={selectThisToggle}
      variants={variants}
      animate={isSelected ? "opened" : isNotSelected ? "closed" : "opened"}
      whileHover={
        isViewMode && {
          border: "1px solid whitesmoke",
        }
      }
      transition={{ type: "spring", stiffness: 100, duration: 200 }}
    >
      {isSelected ? (
        <ContentContainer>
          <Div
            style={{
              height: "30%",
            }}
          >
            <AuthorInContent>
              {isWriteMode ? id : article_author}
            </AuthorInContent>
            <TitleInContent>
              {isWriteMode ? (
                <InputTitle
                  tabIndex={1}
                  ref={FocusTitleRef}
                  placeholder="Title"
                />
              ) : (
                article_title
              )}
            </TitleInContent>
            {isViewMode && (
              <Div
                style={{
                  x: "1rem",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <DonateButton>Donate</DonateButton>
                <TotalDonation>Total Donation: 21231</TotalDonation>
              </Div>
            )}
          </Div>
          <Content>
            {isWriteMode ? (
              <TextArea
                tabIndex={2}
                placeholder="Content"
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    e.preventDefault();
                  }
                }}
              ></TextArea>
            ) : (
              article_content
            )}
          </Content>
          {isViewMode && (
            <Div
              style={{
                height: "10%",
                justifyContent: "space-between",
              }}
            >
              <ViewsInContent>views: {article_views}</ViewsInContent>
              <CreatedAtInContent>{article_created_at}</CreatedAtInContent>
            </Div>
          )}
        </ContentContainer>
      ) : (
        <Block>
          <Author>{article_author}</Author>
          <Title>{article_title}</Title>
          <CreatedAt>{article_created_at}</CreatedAt>
          <Views>{article_views}</Views>
        </Block>
      )}
    </Container>
  );
}

export default Post;
